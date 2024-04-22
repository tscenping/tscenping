import { ChatNoticeEventType } from "types/ChatTypes";
import { useChat } from "store/chat";
import { useEffect } from "react";
import useAxios from "hooks/useAxios";

interface ChatNoticeProps {
  nickname: string;
  noticeType: ChatNoticeEventType;
}

const ChatNotice = (props: ChatNoticeProps): JSX.Element => {
  const { setInChatInfo, inChatInfo } = useChat();
  const instance = useAxios();

  const eventType = (() => {
    switch (props.noticeType) {
      case "EXIT":
        return "채팅에서 나가셨습니다.";
      case "JOIN":
        return "채팅에 참여했습니다.";
      case "MUTE":
        return "30초간 채팅금지 당했습니다.";
      case "KICK":
        return "채팅에서 강퇴 당했습니다.";
      case "BAN":
        return "채팅에서 밴 당했습니다.";
      case "ADMIN":
        return "채팅의 관리자로 임명되었습니다.";
      case "ADMIN_CANCEL":
        return "채팅의 관리자에서 해임되었습니다.";
    }
  })();

  const updateChatInfo = async () => {
    try {
      const response = await instance.get(
        `/channels/enter/${inChatInfo.inChat}`
      );
      if (response.status === 200) {
        setInChatInfo({
          ...inChatInfo,
          chatUsersCount: response.data.channelUsers.length,
          chatUsers: response.data.channelUsers,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.noticeType === "JOIN") updateChatInfo();
    if (props.noticeType === "EXIT") updateChatInfo();
  }, []);

  return (
    <section className="my-2 flex font-[Pretendard-Regular] text-[#dadada] text-[12px] justify-center w-full">
      {props.nickname}님이 {eventType}
    </section>
  );
};

export default ChatNotice;
