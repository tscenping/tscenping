import { ChangeEvent, RefObject, useState } from "react";
import { ChatPasswordErrorTypes } from "types/ChatTypes";

interface PasswordInputProps {
  passwordRef: RefObject<HTMLInputElement>;
  passwordError: ChatPasswordErrorTypes;
}
const PasswordInput = (props: PasswordInputProps): JSX.Element => {
  const [password, setPassword] = useState<string>("");

  const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (props.passwordRef.current) {
      props.passwordRef.current.value = e.target.value;
    }
  };

  return (
    <>
      <section className="flex items-center mb-3">
        <input
          type="password"
          className="w-full font-[Pretendard-Medium] rounded-[20px] py-2.5 px-5 border-[1px] border-solid border-[#919191] outline-none bg-[#4f4f4f] text-white  focus:border-customGreen text-base sm:text-lg md:text-xl"
          id="chatPassword"
          maxLength={16}
          onChange={passwordInputHandler}
          ref={props.passwordRef}
        />
        <span className="absolute right-10 text-[#919191] font-[Pretendard-Regular] text-base">
          {password.length}/16
        </span>
      </section>
      <p className="text-sm sm:text-base text-start w-full mb-5 text-customGreen h-4">
        {" "}
        {props.passwordError === "NOPASSWORD" &&
          "* 채팅방 비밀번호를 설정해주세요."}
        {props.passwordError === "" && ""}
        {props.passwordError === "LESSPASSWORD" &&
          "* 채팅방 비밀번호는 8 ~ 16자 사이로 작성해주세요."}
      </p>
    </>
  );
};

export default PasswordInput;
