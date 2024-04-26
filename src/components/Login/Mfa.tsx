import { useRef, useState, ChangeEvent, FormEvent } from "react";
import QRCode from "react-qr-code";
import { useMyData } from "store/profile";
import useAxios from "hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { channelSocket } from "socket/ChannelSocket";

const Mfa = (): JSX.Element => {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]; // 각 input에 대한 ref 배열
  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]); // 여러 input에 대한 상태 배열
  const [error, setError] = useState<string>("");
  const { myData } = useMyData();
  const instance = useAxios();
  const navigate = useNavigate();

  const handleInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      if (index < inputRefs.length - 1 && value.length === 1) {
        inputRefs[index + 1].current?.focus();
      }

      return newValues;
    });
  };

  const mfaSubmitApiHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mfaCode = inputRefs.map((ref) => ref.current?.value).join("");
    if (mfaCode.length < 6) {
      setError("notEnoughNumber");
      return;
    }
    console.log(mfaCode);

    try {
      const response = await instance.patch("/auth/signin/mfa", {
        userId: myData.id,
        token: mfaCode,
      });
      if (response.status === 200) {
        channelSocket.connect();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex flex-col justify-between w-full h-screen">
      <header className="w-full pt-10 flex justify-center text-[18px] font-bold md:text-[24px]">
        <h1>2차 인증</h1>
      </header>
      <section className="px-5 w-full flex flex-col mb-10">
        <section className="flex flex-col items-center">
          {myData.mfaCode && (
            <section className="bg-white p-3 mb-9 rounded-[10px]">
              <QRCode value={myData.mfaCode} className="w-40 h-40" />
            </section>
          )}
          <strong className={`text-center text-[18px]`}>
            <p>
              {myData.mfaCode
                ? "새로운 QR Code 발급시"
                : "Google Authenticator 어플리케이션으로"}
            </p>
            <p className="mt-1">
              {myData.mfaCode
                ? "해당 QR Code로 인증을 진행해 주세요."
                : "2차인증 여섯자리 숫자를 입력해주세요."}
            </p>
          </strong>
        </section>
        {myData.mfaCode && (
          <span className="text-center font-[Pretendard-SemiBold] text-[#a8a8a8] text-[14px] leading-5 mt-10">
            Google Authenticator 어플리케이션으로
            <br />
            2차인증 여섯자리 숫자를 입력해주세요.
          </span>
        )}
        <form
          className="w-full flex flex-col items-center justify-center mt-10"
          onSubmit={mfaSubmitApiHandler}
          id="mfaSubmitForm"
        >
          <section className="mb-8 flex items-center justify-center w-full">
            {inputValues.map((value, index) => (
              <input
                className="w-9 mx-2 py-2 text-lg text-center border border-white rounded-[14px] bg-transparent text-white focus:outline-none"
                key={index}
                type="text"
                maxLength={1}
                value={value || ""}
                ref={inputRefs[index]}
                onChange={(e) => handleInputChange(index, e)}
              />
            ))}
          </section>
          {error === "wrongNumber" && (
            <p className="text-customGreen">잘못된 인증 번호 입니다.</p>
          )}
          {error === "notEnoughNumber" && (
            <p className="text-customGreen">여섯 자리를 모두 입력해주세요.</p>
          )}
        </form>
      </section>
      <button
        className="pb-20 font-[Pretendard-SemiBold] text-base md:text-xl lg:text-2xl"
        form="mfaSubmitForm"
        type="submit"
      >
        다음
      </button>
    </section>
  );
};

export default Mfa;
