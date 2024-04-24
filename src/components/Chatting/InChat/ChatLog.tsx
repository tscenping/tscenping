import InChatHeader from "./InChatHeader";
import OpponentMessage from "./OpponentMessage";
import MyMessage from "./MyMessage";
import MessageInput from "./MessageInput";
import { nanoid } from "nanoid";
import { FormEvent, useRef, useEffect } from "react";
import { channelSocket } from "socket/ChannelSocket";
import { useChat } from "store/chat";
import { useMessage } from "store/chat";
import { useMyData } from "store/profile";
import ChatNotice from "./ChatNotice";

const ChatLog = (): JSX.Element => {
  const messageRef = useRef<HTMLInputElement>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { inChatInfo } = useChat();
  const { chatLog } = useMessage();
  const { myData } = useMyData();

  const SendMessageSocketHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (channelSocket.connected) {
      channelSocket.emit("message", {
        channelId: inChatInfo.inChat,
        message: messageRef.current?.value,
      });
      messageRef.current && (messageRef.current.value = "");
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <section className="flex flex-col justify-between w-full h-full">
      <section className="relative h-9/10 xs:h-5/6 xxs:h-4/5 md:h-5/6 lg:h-9/10">
        <InChatHeader />
        <section className="h-full p-3">
          <ul className="flex flex-col h-full overflow-y-auto scrollbar-hide ">
            {chatLog.map((el) => {
              if (el.eventType && el.channelId === inChatInfo.inChat) {
                return (
                  <ChatNotice
                    nickname={el.nickname}
                    noticeType={el.eventType}
                  />
                );
              }
              if (el.channelId === inChatInfo.inChat) {
                return el.nickname === myData.nickname ? (
                  <MyMessage
                    nickname={el.nickname}
                    message={el.message}
                    channelId={el.channelId}
                    time={el.time}
                    key={nanoid()}
                  />
                ) : (
                  <OpponentMessage
                    nickname={el.nickname}
                    message={el.message}
                    channelId={el.channelId}
                    time={el.time}
                    avatar={el.avatar}
                    key={nanoid()}
                  />
                );
              }
            })}
            <div ref={messageEndRef}></div>
          </ul>
        </section>
      </section>
      <MessageInput
        messageRef={messageRef}
        sendMessageHandler={SendMessageSocketHandler}
      />
    </section>
  );
};

export default ChatLog;
