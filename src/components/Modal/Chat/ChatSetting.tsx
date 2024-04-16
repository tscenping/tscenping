import { useModalState } from "../../../store/modal";
import { useChatSetting, useChat } from "../../../store/chat";

const ChatSetting = (): JSX.Element => {
  const { title, content, confirmComment, onConfirm } = useChatSetting();
  const { setModalName } = useModalState();
  const { inChatInfo } = useChat();

  return (
    <>
      <h1 className="text-base md:text-lg lg:text-xl xl:text-2xl font-[Pretendard-ExtraBold] pt-5 mb-1">
        {title}
      </h1>
      <span className="text-base md:text-lg lg:text-xl xl:text-2xl font-[Pretendard-SemiBold]">
        {content}
      </span>
      <section className="pt-7 pb-1 flex ">
        <button
          className="bg-customGreen text-black w-1/2 rounded-[20px] py-2 text-base mr-5"
          onClick={onConfirm}
        >
          {confirmComment}
        </button>
        <button
          className="bg-white w-1/2 text-black rounded-[20px] py-2 text-base"
          onClick={() => {
            if (inChatInfo.inChat) setModalName("chatUserList");
            else setModalName(null);
          }}
        >
          취소
        </button>
      </section>
    </>
  );
};

export default ChatSetting;
