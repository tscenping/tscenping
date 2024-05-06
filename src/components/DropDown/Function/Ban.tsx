import { dropDownStyle } from "../Normal/NormalDropDown";
import { DropDownProps } from "types/DropDownTypes";
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

export default function Ban({ props }: Props) {
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

  const banApiHandler = async () => {
    try {
      const response = await instance.patch("/channels/ban", {
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
        querySnapshot.forEach(async (doc) => {
          const docRef = doc.ref;
          await updateDoc(docRef, {
            userCount: result,
          });
        });
        setContent(`${props.nickname}님을 입장 금지 시켰어요.`);
        setModalName("notice");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const banHandler = () => {
    setChatSetting(
      "",
      `${props.nickname}님을 입장 금지 시키겠어요?`,
      "금지하기",
      banApiHandler
    );
    setModalName("chatSetting");
  };

  //내 타입이 owner, admin이여야 하며 상대가 owner,admin이 아니고 member여야만 보여야 한다.

  const showBan =
    props.myChannelUserType === "OWNER"
      ? dropDownStyle
      : props.myChannelUserType === "ADMIN" &&
        props.channelUserType === "MEMBER"
      ? dropDownStyle
      : "hidden";

  const BanIcon = useDorpDownIcon({ types: "BAN" });
  return (
    <li className={showBan} onClick={banHandler}>
      {BanIcon} 밴하기
    </li>
  );
}
