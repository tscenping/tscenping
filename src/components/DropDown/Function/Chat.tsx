import useDorpDownIcon from "../../../hooks/useDropDownIcon";
import { useModalState } from "store/modal";
import { useChatSetting } from "store/chat";
import { useChat } from "store/chat";
import useAxios from "hooks/useAxios";
import { dropDownStyle } from "../Normal/NormalDropDown";
import { DropDownProps } from "types/DropDownTypes";
import firebaseSetting from "func/settingFirebase";
import { collection, addDoc } from "firebase/firestore/lite";

interface Props {
  props: DropDownProps;
}

export default function Chat({ props }: Props) {
  const instance = useAxios();
  const { setInChatInfo, inChatInfo } = useChat();
  const { setChatSetting } = useChatSetting();
  const { setModalName } = useModalState();
  const { db } = firebaseSetting();

  const addFireStore = async (channelId: number) => {
    const userCollectionRef = collection(db, "chat");
    await addDoc(userCollectionRef, {
      channelId: channelId,
      userCount: 2,
      messages: [],
    });
  };

  const createOneOnOneApiHandler = async () => {
    try {
      const response = await instance.post("/channels", {
        name: props.nickname,
        channelType: "DM",
        password: null,
        userId: props.id,
      });
      if (response.status === 201) {
        setInChatInfo({
          ...inChatInfo,
          inChat: response.data.channelId,
          chatTitle: response.data.channelUsers[1].nickname,
          chatUsers: response.data.channelUsers,
          channelType: "DM",
          myChannelUserType: "OWNER",
          chatUsersCount: response.data.channelUsers.length,
        });
        setModalName(null);
        addFireStore(response.data.channelId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const chatIcon = useDorpDownIcon({ types: "CHAT" });
  return (
    <li
      className={`${dropDownStyle} ${props.isBlocked ? "hidden" : ""}`}
      onClick={() => {
        setChatSetting(
          "",
          `${props.nickname}님과의 1:1채팅을 생성하시겠어요?`,
          "생성하기",
          createOneOnOneApiHandler
        );
        setModalName("chatSetting");
        props.setDropDownType!("NONE");
      }}
    >
      {chatIcon} 1:1대화
    </li>
  );
}
