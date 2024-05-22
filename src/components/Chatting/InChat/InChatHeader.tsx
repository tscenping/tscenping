import back from "img/Friends/backUsers.svg";
// import setting from "img/Chatting/setting.svg";
import setting from "img/Friends/3dot.svg";
import { useModalState } from "store/modal";
import { useChat, useMessage } from "store/chat";

const InChatHeader = (): JSX.Element => {
  const { setModalName } = useModalState();
  const { inChatInfo, setEmptyInChatInfo } = useChat();
  const { setParseChatLog } = useMessage();

  return (
    <>
      <header className="flex w-full justify-between items-center">
        <img
          src={back}
          alt=""
          className="w-3 md:w-4 cursor-pointer"
          onClick={() => {
            setEmptyInChatInfo();
            setParseChatLog([]);
          }}
        />
        <section className="font-[Pretendard-SemiBold] xxs:text-base xs:text-lg sm:text-xl md:text-2xl">
          <strong>{inChatInfo.chatTitle}</strong>
          {inChatInfo.channelType !== "DM" && (
            <span className="ml-4 text-[#9e9e9e]">
              {inChatInfo.chatUsersCount}/10
            </span>
          )}
        </section>
        <img
          src={setting}
          alt=""
          className="w-5 xxs:w-6 xs:w-7 sm:w-8 md:w-10 cursor-pointer"
          onClick={() => {
            setModalName("chatUserList");
          }}
        />
      </header>
    </>
  );
};

export default InChatHeader;
