import { RefObject, useState } from "react";

interface NickNameInputProps {
  nicknameRef: RefObject<HTMLInputElement>;
}

const NickNameInput = (props: NickNameInputProps): JSX.Element => {
  const [nickname, setNickname] = useState<string>("");

  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(
      /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g,
      ""
    );
    const truncatedValue = filteredValue.slice(0, 10);
    setNickname(truncatedValue);
    if (props.nicknameRef.current) {
      props.nicknameRef.current.value = truncatedValue;
    }
  };

  return (
    <section className="w-full relative flex items-center">
      <input
        type="text"
        className="w-full p-3 pl-6 rounded-[20px] bg-[#2d2d2d] border-[1px] border-solid border-white outline-none focus:border-customGreen"
        onChange={nicknameHandler}
        ref={props.nicknameRef}
        maxLength={10}
      />
      <span className={`absolute right-5 text-[#b3b3b3]`}>
        {nickname.length}/10
      </span>
    </section>
  );
};

export default NickNameInput;
