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
import { GameInviteType, GameMatchType } from "types/GameTypes";
import { useGameInviteState, useGameMatchState } from "store/game";
import { useNavigate } from "react-router-dom";
import { useToastState } from "store/toast";

const ChannelSocketHandler = () => {
  const { setChatLog } = useMessage();
  const navigation = useNavigate();
  const { myData } = useMyData();
  const { db } = firebaseSetting();
  const { blockUsers } = useBlocks();
  const { invitationId, setGameInviteState } = useGameInviteState();
  const { setToastState } = useToastState();
  const {setGameMatchState} = useGameMatchState();

  const firebaseConfig = {
    projectId: "tscenping",
    //...
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

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

  const gameInviteHandler = (inviteData: GameInviteType) => {
    if (invitationId === -1) {
      console.log(inviteData, "inviteData")
      setGameInviteState(inviteData);
      setToastState("game");
      console.log("ㅋㅌㅊ");
    }
    console.log("퓨퓨");
  };

  const gameInviteResponseHandler = (gameData: GameMatchType) => {
    if (gameData.isAccepted === true) {
      setGameMatchState(gameData);
      navigation("/game")
    }
  }


  useEffect(() => {
    console.log("channelSocketHandler active.....");
    channelSocket.on("message", receiveMessageSocketHandler);
    channelSocket.on("notice", receiveChatNoticeSocketHandler);
    return () => {
      channelSocket.off("message", receiveMessageSocketHandler);
      channelSocket.off("notice", receiveChatNoticeSocketHandler);
    };
    if (channelSocket.connected) {
      // channelSocket.on("gameInvitation", gameInviteHandler);
      channelSocket.on("message", receiveMessageSocketHandler);
      channelSocket.on("notice", receiveChatNoticeSocketHandler);
      return () => {
        channelSocket.off("message", receiveMessageSocketHandler);
        channelSocket.off("notice", receiveChatNoticeSocketHandler);
        // channelSocket.off("gameInvitation", gameInviteHandler);
      };
    }
  }, [receiveMessageSocketHandler, receiveChatNoticeSocketHandler]);

  useEffect(() => {
    channelSocket.on("gameInvitation", gameInviteHandler);
    channelSocket.on("gameInvitationReply", gameInviteResponseHandler);
    return () => {
      channelSocket.off("gameInvitation", gameInviteHandler);
      channelSocket.off("gameInvitationReply", gameInviteResponseHandler);
    };
  }, [gameInviteHandler]);
  // 채널소켓 "message" "on" 핸들러
  return <></>;
};

export default ChannelSocketHandler;
