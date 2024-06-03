import { DropDownProps } from "types/DropDownTypes";
import { dropDownStyle } from "../Normal/NormalDropDown";
import useDorpDownIcon from "hooks/useDropDownIcon";
import { useModalState, useNoticeModalState } from "store/modal";
import { useChatSetting, useChat } from "store/chat";
import useAxios from "hooks/useAxios";
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  Firestore,
} from "firebase/firestore/lite";
import firebaseSetting from "func/settingFirebase";

interface Props {
  props: DropDownProps;
}

export default function Kick({ props }: Props) {
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();
  const { setContent } = useNoticeModalState();
  const { inChatInfo } = useChat();
  const { db } = firebaseSetting();

  const instance = useAxios();

  async function getUserCount(db: Firestore) {
    const messagesCol = collection(db, "chat");
    const orderMessage = query(messagesCol);
    const messageSnapshot = await getDocs(orderMessage);
    const messageData = messageSnapshot.docs.find((doc) => {
      return doc.data().channelId === inChatInfo.inChat;
    });
    return messageData?.data().userCount;
  }

  const kickApiHandler = async () => {
    try {
      const response = await instance.patch("/channels/kick", {
        channelUserId: props.channelUserId,
      });
      if (response.status === 200) {
        const userCollectionRef = collection(db, "chat");
        const q = query(
          userCollectionRef,
          where("channelId", "==", inChatInfo.inChat)
        );
        const querySnapshot = await getDocs(q);
        const result = (await getUserCount(db)) - 1;
        console.log(result);
        querySnapshot.forEach(async (doc) => {
          const docRef = doc.ref;
          await updateDoc(docRef, {
            userCount: result,
          });
        });
        setContent(`${props.nickname}님을 강제 퇴장 시켰어요.`);
        setModalName("notice");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const kickHandler = () => {
    setChatSetting(
      "",
      `${props.nickname}님을 강제 퇴장 시키겠어요?`,
      "퇴장 시키기",
      kickApiHandler
    );
    setModalName("chatSetting");
  };

  const showKick =
    props.myChannelUserType === "OWNER"
      ? dropDownStyle
      : props.myChannelUserType === "ADMIN" &&
        props.channelUserType === "MEMBER"
      ? dropDownStyle
      : "hidden";

  const KickIcon = useDorpDownIcon({ types: "KICK" });
  return (
    <li className={showKick} onClick={kickHandler}>
      {KickIcon} 강퇴하기
    </li>
  );
}
