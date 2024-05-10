import { channelSocket } from "socket/ChannelSocket";
import { MessageType, InviteChatSocketDataTypes } from "types/ChatTypes";
import { useMessage, useInviteChat } from "store/chat";
import { useEffect } from "react";
import {
  collection,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { GameMatchType, InviteInType } from "types/GameTypes";
import { useGameInviteState, useGameMatchState } from "store/game";
import { useNavigate } from "react-router-dom";
import { useToastState } from "store/toast";
import firebaseSetting from "func/settingFirebase";

const ChannelSocketHandler = () => {
  const { setChatLog } = useMessage();
  const navigation = useNavigate();

  const { db } = firebaseSetting();

  const { inviteType, setGameInviteState } = useGameInviteState();
  const { setToastState } = useToastState();
  const { setGameMatchState } = useGameMatchState();
  const { setInviteChatInfo, inviteChatInfo } = useInviteChat();

  // 채널소켓 "message" "on" 핸들러
  const receiveMessageSocketHandler = async (message: MessageType) => {
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
  };

  const receiveChatNoticeSocketHandler = async (notice: MessageType) => {
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
  };

  const gameInviteHandler = (inviteData: InviteInType) => {
    if (inviteType.invitationId === -1) {
      console.log(inviteData, "inviteData", inviteType.invitingUserNickname);
      setGameInviteState(inviteData);
      setToastState("game");
      console.log("초대 받기 완료");
    }
    console.log("퓨퓨");
  };

  const gameInviteResponseHandler = (gameData: GameMatchType) => {
    if (gameData.isAccepted === true) {
      setGameMatchState(gameData);
      navigation("/game");
    }
  };

  const chatInviteHandler = (inviteChat: InviteChatSocketDataTypes) => {
    if (inviteChatInfo.inviteChatId === -1) {
      setInviteChatInfo({
        inviteChatId: inviteChat.invitationId,
        inviteChatUserNickname: inviteChat.invitingUserNickname,
      });
      setToastState("chat");
    }
  };

  const dupLoginCheck = (data: string) => {
    navigation("/login");
  };

  useEffect(() => {
    channelSocket.on("gameInvitation", gameInviteHandler);
    channelSocket.on("gameInvitationReply", gameInviteResponseHandler);
    channelSocket.on("message", receiveMessageSocketHandler);
    channelSocket.on("notice", receiveChatNoticeSocketHandler);
    channelSocket.on("privateAlert", chatInviteHandler);
    channelSocket.on("error", dupLoginCheck);
    return () => {
      channelSocket.off("gameInvitation", gameInviteHandler);
      channelSocket.off("gameInvitationReply", gameInviteResponseHandler);
      channelSocket.off("message", receiveMessageSocketHandler);
      channelSocket.off("notice", receiveChatNoticeSocketHandler);
      channelSocket.off("privateAlert", chatInviteHandler);
      channelSocket.off("error", dupLoginCheck);
    };
    // })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default ChannelSocketHandler;
