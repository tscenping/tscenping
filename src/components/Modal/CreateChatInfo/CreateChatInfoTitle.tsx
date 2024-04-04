import { RefObject, useState } from "react";

interface CreateChatInfoTitleProps {
  titleRef: RefObject<HTMLInputElement>;
}

const CreateChatInfoTitle = (props: CreateChatInfoTitleProps): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [test, setTest] = useState<boolean>();

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          maxLength={20}
        />
        <span className="absolute right-5 text-[#919191] font-[Pretendard-Regular] text-base">
          {title.length}/20
        </span>
      </section>
      <p className="text-sm sm:text-base text-start w-full mt-2 text-customGreen h-4">
        {test ? "* 이미 존재하는 이름이에요." : ""}
      </p>
    </section>
  );
};

export default CreateChatInfoTitle;
