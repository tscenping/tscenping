import { channelSocket } from "socket/ChannelSocket";
import { MessageType } from "types/ChatTypes";
import { useChat } from "store/chat";
import { useMessage } from "store/chat";
import { useEffect } from "react";

const ChannelSocketHandler = () => {
  const { inChatInfo } = useChat();
  const { setChatLog } = useMessage();

  // 채널소켓 "message" "on" 핸들러
  const receiveMessageSocketHandler = (message: MessageType) => {
    //밑에 주석 해제하면 해당 채널에 메세지만 저장 메세지 받음
    // if (inChatInfo.inChat !== message.channelId) return;
    //위에 주석 해제하면 입장한 해당 채널에 메세지만 저장
    const time = new Date();
    const hour = String(time.getHours()).padStart(2, "0");
    const minute = String(time.getMinutes()).padStart(2, "0");

    const resultTime = `${Number(hour) < 12 ? "오전" : "오후"} ${
      Number(hour) < 24 && Number(hour) > 12 ? Number(hour) - 12 : hour
    }:${minute}`;

    const user = inChatInfo.chatUsers.find(
      (user) => user.nickname === message.nickname
    );

    if (!user || (user.isBlocked && user.avatar)) {
      setChatLog({
        nickname: "",
        message: user
          ? "차단된 유저의 메세지 입니다."
          : "알 수 없는 유저의 메시지 입니다.",
        time: resultTime,
        channelId: message.channelId,
      });
    } else {
      setChatLog({
        nickname: message.nickname,
        avatar: user.avatar,
        message: message.message,
        time: resultTime,
        channelId: message.channelId,
      });
    }
  };

  const receiveChatNoticeSocketHandler = (notice: MessageType) => {
    if (inChatInfo.inChat !== notice.channelId) return;
    setChatLog({
      nickname: notice.nickname,
      channelId: notice.channelId,
      eventType: notice.eventType,
    });
  };

  useEffect(() => {
    if (channelSocket.connected) {
      channelSocket.on("message", receiveMessageSocketHandler);
      channelSocket.on("notice", receiveChatNoticeSocketHandler);
      return () => {
        channelSocket.off("message", receiveMessageSocketHandler);
        channelSocket.off("notice", receiveChatNoticeSocketHandler);
      };
    }
  }, [receiveMessageSocketHandler, receiveChatNoticeSocketHandler]);
  // 채널소켓 "message" "on" 핸들러
  return <></>;
};

export default ChannelSocketHandler;
