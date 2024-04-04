import { RefObject, useState } from "react";

interface CreateChatInfoPasswordProps {
  passwordRef: RefObject<HTMLInputElement>;
}

const CreateChatInfoPassword = (
  props: CreateChatInfoPasswordProps
): JSX.Element => {
  const [password, setPassword] = useState<string>("");
  const [test, setTest] = useState<boolean>();

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <section className="flex flex-col my-5">
      <label
        htmlFor="chatPassword"
        className="mb-3 text-base font-[Pretendard-SemiBold] text-start"
      >
        채팅방 비밀번호 설정
      </label>
      <section className="relative flex items-center">
        <input
          type="password"
          className="w-full font-[Pretendard-Medium] rounded-[20px] py-2.5 px-5 border-[1px] border-solid border-[#919191] outline-none bg-[#4f4f4f] text-white  focus:border-customGreen text-base sm:text-lg md:text-xl"
          id="chatPassword"
          ref={props.passwordRef}
          onChange={passwordHandler}
          maxLength={16}
        />
        <span className="absolute right-5 text-[#919191] font-[Pretendard-Regular] text-base">
          {password.length}/16
        </span>
      </section>
      <p
        className={
          "text-sm sm:text-base text-start w-full mt-2 text-customGreen h-4"
        }
      >
        {test ? "* 채팅방 비밀번호를 설정해주세요." : ""}
      </p>
    </section>
  );
};

export default CreateChatInfoPassword;
