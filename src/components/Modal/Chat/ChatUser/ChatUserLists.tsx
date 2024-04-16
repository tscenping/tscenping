import lock from "../../../../img/Chatting/lock.svg";
import toggle from "../../../../img/Chatting/toggle.svg";
import { useChat, useChatSetting } from "../../../../store/chat";
import { useModalState } from "../../../../store/modal";
import useAxios from "../../../../hooks/useAxios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ChatUserList from "./ChatUserList";
import exitChat from "../../../../img/Chatting/out.svg";

const ChatUserLists = (): JSX.Element => {
  const instance = useAxios();
  const { inChatInfo, setInChatInfo } = useChat();
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();
  const queryClient = useQueryClient();

  const exitChatHandler = async () => {
    try {
      const response = await instance.patch("/channels/exit", {
        channelId: inChatInfo.inChat,
      });
      if (response.status === 200) {
        setModalName(null);
        setInChatInfo({ ...inChatInfo, inChat: 0 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation({
    mutationFn: exitChatHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["open-password"] });
    },
  });
  console.log(inChatInfo.myChannelUserType);
  return (
    <section className="pl-6 pt-14 pb-10 text-base md:font-lg font-[Pretendard-SemiBold] flex flex-col justify-between h-full">
      <section>
        <header className="pb-10">채팅 상대</header>
        <ul className="pr-5">
          {inChatInfo.chatUsers &&
            inChatInfo.chatUsers.map((el) => (
              <ChatUserList
                channelUserId={el.channelUserId}
                userId={el.userId}
                nickname={el.nickname}
                avatar={el.avatar}
                isFriend={el.isFriend}
                isBlocked={el.isBlocked}
                channelUserType={el.channelUserType}
                myChannelUserType={el.myChannelUserType}
              />
            ))}
        </ul>
      </section>
      <section className="pt-5 pr-5">
        {inChatInfo.myChannelUserType === "OWNER" && (
          <h1 className="font-[Pretendard-SemiBold] text-base sm:text-lg lg:text-xl xl:text-3xl pb-5 sm:pb-7 lg:pb-9 xl:pb-11">
            채팅방 설정
          </h1>
        )}
        <ul>
          {inChatInfo.myChannelUserType === "OWNER" && (
            <li className="cursor-pointer mb-5 sm:mb-7 lg:mb-9 xl:mb-11 flex justify-between ">
              <span className="text-sm  sm:text-base lg:text-lg xl:text-2xl">
                채팅 모드 변경
              </span>
              <section className="flex items-end">
                <img
                  src={lock}
                  className="cursor-pointer w-6"
                  alt="Change chat mode password"
                />
                <img
                  src={toggle}
                  className="ml-4 cursor-pointer w-6 sm:w-7 md:w-8 lg:w-9"
                  alt="Change chat mode"
                />
              </section>
            </li>
          )}
          {inChatInfo.myChannelUserType === "OWNER" && (
            <li className="cursor-pointer text-sm mb-5 sm:mb-7 lg:mb-9 xl:mb-11 sm:text-base lg:text-lg xl:text-2xl">
              비밀번호 변경
            </li>
          )}
          <li
            className="flex justify-between items-center cursor-pointer"
            onClick={() => {
              setChatSetting(
                inChatInfo.chatTitle,
                "채팅방에서 나가시겠어요?",
                "나가기",
                () => {
                  mutate();
                }
              );
              setModalName("chatSetting");
            }}
          >
            <span className="text-sm cursor-pointer sm:text-base lg:text-lg xl:text-2xl">
              채팅방 나가기
            </span>
            <img src={exitChat} className="w-6 sm:w-7 md:w-8 lg:w-9" />
          </li>
        </ul>
      </section>
    </section>
  );
};

export default ChatUserLists;
