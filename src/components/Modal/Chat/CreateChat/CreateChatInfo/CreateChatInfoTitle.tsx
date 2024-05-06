import { RefObject, useState } from "react";

interface CreateChatInfoTitleProps {
  titleRef: RefObject<HTMLInputElement>;
  titleError: boolean;
}

const CreateChatInfoTitle = (props: CreateChatInfoTitleProps): JSX.Element => {
  const [title, setTitle] = useState<string>("");

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const truncatedValue = e.target.value.slice(0, 10);
    if (props.titleRef.current) {
      props.titleRef.current.value = truncatedValue;
    }
    setTitle(e.target.value);
  };

  return (
    <section className="flex flex-col mb-8">
      <label
        htmlFor="chatTitle"
        className="mb-3 text-base font-[Pretendard-SemiBold] text-start"
      >
        채팅방 이름 설정
      </label>
      <section className="relative flex items-center">
        <input
          type="text"
          className="w-full font-[Pretendard-Medium] rounded-[20px] py-2.5 px-5 border-[1px] border-solid border-[#919191] outline-none bg-[#4f4f4f] text-white focus:border-customGreen text-base sm:text-lg md:text-xl"
          id="chatTitle"
          ref={props.titleRef}
          onChange={titleHandler}
          maxLength={10}
        />
        <span className="absolute right-5 text-[#919191] font-[Pretendard-Regular] text-base">
          {title.length}/10
        </span>
      </section>
      <p className="text-sm sm:text-base text-start w-full mt-2 text-customGreen h-4">
        {props.titleError ? "* 채팅방을 입력해주세요." : ""}
      </p>
    </section>
  );
};

export default CreateChatInfoTitle;
