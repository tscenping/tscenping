import { RefObject, FormEvent, useState } from "react";
import sendMessageButton from "img/Chatting/sendMsg.svg";
import { channelSocket } from "socket/ChannelSocket";
import { useChat } from "store/chat";
import firebaseSetting from "func/settingFirebase";
import {
  collection,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { useMyData } from "store/profile";

interface MessageInputProps {
  messageRef: RefObject<HTMLTextAreaElement>;
  sendMessageHandler: (e: FormEvent<HTMLFormElement>) => void;
}

const MessageInput = (props: MessageInputProps): JSX.Element => {
  const [sendMessage, setSendMessage] = useState<string>("");
  const { inChatInfo } = useChat();
  const { db } = firebaseSetting();
  const { myData } = useMyData();

  const pressEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      props.sendMessageHandler(e);
    }
  };

  const sendMessageBtnApiHandler = async () => {
    const trimmedMessage = sendMessage.trim();
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
          message: sendMessage,
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
        setSendMessage("");
        props.messageRef.current && (props.messageRef.current.value = "");
      }
    }
  };

  return (
    <form
      className="relative flex items-center mb-3 bg-[#424242] rounded-full align-middle py-3"
      onKeyPress={pressEnter}
      id="message"
    >
      <textarea
        className="pl-5 pr-4 bg-transparent outline-none resize-none w-9/10 scrollbar-hide"
        maxLength={500}
        form="message"
        ref={props.messageRef}
        onChange={(e) => {
          setSendMessage(e.target.value);
        }}
        rows={1}
      />
      <button
        type="button"
        className="absolute right-4"
        onClick={sendMessageBtnApiHandler}
      >
        <img
          src={sendMessageButton}
          alt="send message button"
          className="w-8"
        />
      </button>
    </form>
  );
};

export default MessageInput;
