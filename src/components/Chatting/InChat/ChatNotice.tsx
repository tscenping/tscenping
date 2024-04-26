import { ChatNoticeEventType } from "types/ChatTypes";
import { useChat } from "store/chat";
import { useEffect } from "react";
import useAxios from "hooks/useAxios";
import { useMyData } from "store/profile";
import { useModalState, useNoticeModalState } from "store/modal";
import { initializeApp } from "firebase/app";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  getFirestore,
} from "firebase/firestore/lite";
import { useMessage } from "store/chat";

interface ChatNoticeProps {
  nickname: string;
  noticeType: ChatNoticeEventType;
  channelId: number;
}

const ChatNotice = (props: ChatNoticeProps): JSX.Element => {
  const { setInChatInfo, inChatInfo, setEmptyInChatInfo } = useChat();
  const { myData } = useMyData();
  const instance = useAxios();
  const { setModalName } = useModalState();
  const { setContent } = useNoticeModalState();
  const { setParseChatLog } = useMessage();

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

  const kickBanChatHandler = async () => {
    if (props.channelId === inChatInfo.inChat) {
      try {
        if (myData.nickname) {
          const firebaseConfig = {
            projectId: "tscenping",
          };
          const app = initializeApp(firebaseConfig);
          const db = getFirestore(app);
          const messagesCol = collection(db, myData.nickname);
          const q = query(
            messagesCol,
            where("channelId", "==", props.channelId)
          );
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
        }
      } catch (error) {
        console.log(error);
      }
      setParseChatLog([]);
      setEmptyInChatInfo();
      setModalName(null);
    }
  };

  const adminChanHandler = () => {
    if (props.channelId === inChatInfo.inChat) {
      setInChatInfo({ ...inChatInfo, myChannelUserType: "ADMIN" });
    }
  };

  const adminCancelHandler = () => {
    if (props.channelId === inChatInfo.inChat) {
      setInChatInfo({ ...inChatInfo, myChannelUserType: "MEMBER" });
    }
  };

  useEffect(() => {
    console.log("active....");
    if (props.nickname === myData.nickname) {
      //닉네임이 같을때는 kick, ban, mute, admin일때 로직을 구성
      if (props.noticeType === "KICK" || props.noticeType === "BAN") {
        kickBanChatHandler();
      }
      if (props.noticeType === "ADMIN") {
        adminChanHandler();
      }
      if (props.noticeType === "ADMIN_CANCEL") {
        adminCancelHandler();
      }
    } else {
      //닉네임이 다를 때는 join, exit일때만 채팅유저리스트 업데이트
      if (
        !inChatInfo.isJoined &&
        (props.noticeType === "JOIN" ||
          props.noticeType === "EXIT" ||
          props.noticeType === "KICK" ||
          props.noticeType === "BAN" ||
          props.noticeType === "ADMIN" || //여기서 바껴야 하는데
          props.noticeType === "ADMIN_CANCEL")
      ) {
        updateChatInfo();
      }

      setInChatInfo({ ...inChatInfo, isJoined: false }); //entered이후에는 해당 값을 false로 바꿔줘서 동작하게 되는 것이다
    }
  }, []);

  return (
    <section className="my-2 flex font-[Pretendard-Regular] text-[#dadada] text-[12px] justify-center w-full">
      {props.nickname}님이 {eventType}
    </section>
  );
};

export default ChatNotice;
