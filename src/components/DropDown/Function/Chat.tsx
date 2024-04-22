import useDorpDownIcon from "../../../hooks/useDropDownIcon";
import { useModalState } from "store/modal";
import { useChatSetting } from "store/chat";
import { useChat } from "store/chat";

import useAxios from "hooks/useAxios";

interface ChatProps {
  nickname?: string;
  userId?: number;
}

export default function Chat(props: ChatProps) {
  const instance = useAxios();
  const { setInChatInfo, inChatInfo } = useChat();
  const { setChatSetting } = useChatSetting();
  const { setModalName } = useModalState();

  const createOneOnOneApiHandler = async () => {
    try {
      const response = await instance.post("/channels", {
        name: props.nickname,
        channelType: "DM",
        password: null,
        userId: props.userId,
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const chatIcon = useDorpDownIcon({ types: "CHAT" });
  return (
    <section
      className="flex justify-between w-full"
      onClick={() => {
        setChatSetting(
          "",
          `${props.nickname}님과의 1:1채팅을 생성하시겠어요?`,
          "생성하기",
          createOneOnOneApiHandler
        );
        setModalName("chatSetting");
      }}
    >
      {chatIcon} 1:1대화
    </section>
  );
}
