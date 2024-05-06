import { useModalState } from "store/modal";
import { useChatSetting } from "store/chat";

const ChatSetting = (): JSX.Element => {
  const { title, content, confirmComment, onConfirm } = useChatSetting();
  const { setModalName } = useModalState();

  return (
    <>
      <h1 className="text-base md:text-lg lg:text-xl xl:text-2xl font-[Pretendard-ExtraBold] pt-5 mb-1">
        {title}
      </h1>
      <span className="text-base md:text-lg lg:text-xl xl:text-2xl font-[Pretendard-SemiBold]">
        {content}
      </span>
      <section className="flex pb-1 pt-7 ">
        <button
          className="bg-customGreen text-[#404040] w-1/2 rounded-[20px] py-2 text-base mr-5"
          onClick={onConfirm}
        >
          {confirmComment}
        </button>
        <button
          className="bg-white w-1/2 text-[#404040] rounded-[20px] py-2 text-base"
          onClick={() => {
            setModalName(null);
          }}
        >
          취소
        </button>
      </section>
    </>
  );
};

export default ChatSetting;
