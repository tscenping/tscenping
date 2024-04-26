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
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore/lite";

const ChatLog = (): JSX.Element => {
  const messageRef = useRef<HTMLInputElement>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { inChatInfo, setInChatInfo } = useChat();
  const { chatLog } = useMessage();
  const { myData } = useMyData();

  const SendMessageSocketHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedMessage = messageRef.current?.value.trim(); //메세지의 앞뒤 공백 제거

    if (trimmedMessage) {
      if (channelSocket.connected) {
        channelSocket.emit("message", {
          channelId: inChatInfo.inChat,
          message: messageRef.current?.value,
        });
        messageRef.current && (messageRef.current.value = "");
      }
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  useEffect(() => {
    setInChatInfo({ ...inChatInfo, isJoined: false });
  }, []);

  return (
    <section className="flex flex-col justify-between h-full w-full">
      <section className="h-9/10 xs:h-5/6 xxs:h-4/5 md:h-5/6 lg:h-9/10 relative">
        <InChatHeader />
        <section className="p-3 h-full">
          <ul className="flex flex-col overflow-y-auto h-full scrollbar-hide ">
            {chatLog.map((el, index) => {
              if (el.eventType && el.channelId === inChatInfo.inChat) {
                return (
                  <ChatNotice
                    nickname={el.nickname}
                    noticeType={el.eventType}
                    channelId={el.channelId}
                    key={index}
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
