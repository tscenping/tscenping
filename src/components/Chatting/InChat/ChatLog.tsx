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
import firebaseSetting from "func/settingFirebase";
import {
  collection,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { useBlocks } from "store/friend";

const ChatLog = (): JSX.Element => {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { inChatInfo, setInChatInfo } = useChat();
  const { chatLog } = useMessage();
  const { myData } = useMyData();
  const { db } = firebaseSetting();
  const { blockUsers } = useBlocks();

  const SendMessageSocketHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedMessage = messageRef.current?.value.trim(); //메세지의 앞뒤 공백 제거
    const time = new Date();
    const hour = String(time.getHours()).padStart(2, "0");
    const minute = String(time.getMinutes()).padStart(2, "0");
    const resultTime = `${Number(hour) < 12 ? "오전" : "오후"} ${
      Number(hour) < 24 && Number(hour) > 12 ? Number(hour) - 12 : hour
    }:${minute}`;

    const chatLogData = {
      nickname: myData.nickname,
      avatar: myData.avatar,
      message: trimmedMessage,
      time: resultTime,
      channelId: inChatInfo.inChat,
    };

    if (trimmedMessage) {
      if (channelSocket.connected && !inChatInfo.isMute) {
        channelSocket.emit("message", {
          channelId: inChatInfo.inChat,
          message: messageRef.current?.value,
        });
        try {
          const userCollectionRef = collection(db, "chat");
          const q = query(
            userCollectionRef,
            where("channelId", "==", inChatInfo.inChat)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;
            const existingMessages = doc.data().messages || [];
            await updateDoc(docRef, {
              messages: [...existingMessages, chatLogData],
            });
          });
        } catch (error) {
          console.log(error);
        }
        messageRef.current && (messageRef.current.value = "");
      }
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  useEffect(() => {
    if (inChatInfo.isMute) {
      setTimeout(() => {
        setInChatInfo({ ...inChatInfo, isMute: false });
      }, 30 * 1000);
    }
  }, [inChatInfo.isMute]);

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
                // blockUsers 배열에서 현재 메시지의 닉네임이 있는지 확인
                const blockedUser =
                  blockUsers &&
                  blockUsers.find((user) => user.nickname === el.nickname);
                if (blockedUser) {
                  // 차단된 유저인 경우 "차단된 유저" 메시지를 렌더링
                  return (
                    <OpponentMessage
                      nickname="차단된 유저"
                      message="차단된 유저의 메세지 입니다."
                      channelId={el.channelId}
                      time={el.time}
                      avatar={null} // 차단된 유저의 아바타 정보를 전달할 수도 있음
                      key={nanoid()}
                    />
                  );
                } else {
                  // 차단되지 않은 유저인 경우 메시지를 렌더링
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
