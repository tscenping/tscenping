import back from "img/Friends/backUsers.svg";
import setting from "img/Chatting/setting.svg";
import { useModalState } from "store/modal";
import { useChat } from "store/chat";

const InChatHeader = (): JSX.Element => {
  const { setModalName } = useModalState();
  const { inChatInfo, setInChatInfo } = useChat();

  return (
    <>
      <header className="flex w-full justify-between items-center px-4 py-4">
        <img
          src={back}
          alt=""
          className="w-3 sm:w-3 md:w-4 cursor-pointer"
          onClick={() => {
            setInChatInfo({ ...inChatInfo, inChat: 0 });
          }}
        />
        <section className="font-[Pretendard-SemiBold] text-lg sm:text-xl md:text-2xl">
          <strong className="mr-4">{inChatInfo.chatTitle}</strong>
          {inChatInfo.channelType !== "DM" && (
            <span className="text-[#9e9e9e]">
              {inChatInfo.chatUsersCount}/10
            </span>
          )}
        </section>
        <img
          src={setting}
          alt=""
          className="w-1 cursor-pointer"
          onClick={() => {
            setModalName("chatUserList");
          }}
        />
      </header>
    </>
  );
};

export default InChatHeader;
