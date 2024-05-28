import { ChatNoticeEventType } from "types/ChatTypes";
import { useChat } from "store/chat";
import { useEffect } from "react";
import useAxios from "hooks/useAxios";
import { useMyData } from "store/profile";
import { useModalState } from "store/modal";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from "firebase/firestore/lite";
import { useMessage } from "store/chat";
import firebaseSetting from "func/settingFirebase";

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
  const { setParseChatLog } = useMessage();
  const { db } = firebaseSetting();

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
    console.log(inChatInfo);
    if (props.channelId === inChatInfo.inChat) {
      try {
        const userCollectionRef = collection(db, "chat");
        const q = query(
          userCollectionRef,
          where("channelId", "==", inChatInfo.inChat)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        } else {
          console.log("해당 문서 없음");
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
    if (props.nickname === myData.nickname && !inChatInfo.isJoined) {
      //닉네임이 같을때는 kick, ban, mute, admin일때 로직을 구성
      if (props.noticeType === "KICK" || props.noticeType === "BAN") {
        console.log("active kick ban");
        kickBanChatHandler();
      }
      if (props.noticeType === "ADMIN") {
        console.log("active admin admin");
        adminChanHandler();
      }
      if (props.noticeType === "ADMIN_CANCEL") {
        console.log("active admin cancel");
        adminCancelHandler();
      }
      if (props.noticeType === "MUTE") {
        console.log("active Mute");
        setInChatInfo({ ...inChatInfo, isMute: true });
      }
    } else {
      //닉네임이 다를 때는 join, exit일때만 채팅유저리스트 업데이트
      if (
        !inChatInfo.isJoined &&
        (props.noticeType === "JOIN" ||
          props.noticeType === "EXIT" ||
          props.noticeType === "KICK" ||
          props.noticeType === "BAN" ||
          props.noticeType === "ADMIN" ||
          props.noticeType === "ADMIN_CANCEL")
      ) {
        updateChatInfo();
      }

      setInChatInfo({ ...inChatInfo, isJoined: false }); //entered이후에는 해당 값을 false로 바꿔줘서 동작하게 되는 것이다
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="pb-4 sm:pb-6 md:pb-7 flex font-[Pretendard-Regular] text-[#dadada] text-xs xs:text-sm md:text-base justify-center w-full">
      {props.nickname}님이 {eventType}
    </section>
  );
};

export default ChatNotice;
