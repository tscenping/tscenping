import { channelSocket } from "socket/ChannelSocket";
import { MessageType } from "types/ChatTypes";
import { useMessage } from "store/chat";
import { useEffect, useCallback } from "react";
import {
  collection,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { useMyData } from "store/profile";
import firebaseSetting from "func/settingFirebase";
import { useBlocks } from "store/friend";

const ChannelSocketHandler = () => {
  const { setChatLog } = useMessage();
  const { myData } = useMyData();
  const { db } = firebaseSetting();
  const { blockUsers } = useBlocks();

  // 채널소켓 "message" "on" 핸들러
  const receiveMessageSocketHandler = useCallback(
    async (message: MessageType) => {
      const time = new Date();
      const hour = String(time.getHours()).padStart(2, "0");
      const minute = String(time.getMinutes()).padStart(2, "0");
      const resultTime = `${Number(hour) < 12 ? "오전" : "오후"} ${
        Number(hour) < 24 && Number(hour) > 12 ? Number(hour) - 12 : hour
      }:${minute}`;

      const chatLogData = {
        nickname: message.nickname,
        avatar: message.avatar,
        message: message.message,
        time: resultTime,
        channelId: message.channelId,
      };
      setChatLog(chatLogData);
    },
    [myData.nickname, setChatLog, db, blockUsers]
  );

  const receiveChatNoticeSocketHandler = useCallback(
    async (notice: MessageType) => {
      const noticeData = {
        nickname: notice.nickname,
        channelId: notice.channelId,
        eventType: notice.eventType,
      };
      setChatLog(noticeData);
      try {
        const userCollectionRef = collection(db, "chat");
        const q = query(
          userCollectionRef,
          where("channelId", "==", notice.channelId)
        );
        const querySnapshot = await getDocs(q);
        // if (querySnapshot.empty) {
        //   await addDoc(userCollectionRef, {
        //     messages: [noticeData],
        //     channelId: notice.channelId,
        //   });
        // } else {
        querySnapshot.forEach(async (doc) => {
          const docRef = doc.ref;
          const existingMessages = doc.data().messages || [];

          await updateDoc(docRef, {
            messages: [...existingMessages, noticeData],
          });
        });
        // }
      } catch (error) {
        console.log(error);
      }
    },
    [myData.nickname, setChatLog, db]
  );

  useEffect(() => {
    console.log("channelSocketHandler active.....");
    channelSocket.on("message", receiveMessageSocketHandler);
    channelSocket.on("notice", receiveChatNoticeSocketHandler);
    return () => {
      channelSocket.off("message", receiveMessageSocketHandler);
      channelSocket.off("notice", receiveChatNoticeSocketHandler);
    };
  }, [receiveMessageSocketHandler, receiveChatNoticeSocketHandler]);
  // 채널소켓 "message" "on" 핸들러
  return <></>;
};

export default ChannelSocketHandler;
