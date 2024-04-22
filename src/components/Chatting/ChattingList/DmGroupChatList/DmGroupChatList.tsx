import useAxios from "hooks/useAxios";
import { useChat } from "store/chat";
import { ChatType } from "types/ChatTypes";

interface InChattingListProps {
  channelId: number;
  channelName: string;
  channelType: ChatType;
}

const DmGroupChatList = (props: InChattingListProps): JSX.Element => {
  const inChattingListStyle =
    "bg-[#424242] p-3 px-4 rounded-[20px] mt-6 cursor-pointer font-[Pretendard-SemiBold]";
  const instance = useAxios();
  const { setInChatInfo, inChatInfo } = useChat();

  const enterChatApiHandler = async () => {
    try {
      const response = await instance.get(`/channels/enter/${props.channelId}`);
      if (response.status === 200) {
        setInChatInfo({
          ...inChatInfo,
          inChat: props.channelId,
          channelType: props.channelType,
          chatTitle: props.channelName,
          chatUsers: response.data.channelUsers,
          myChannelUserType: response.data.myChannelUserType,
          chatUsersCount: response.data.channelUsers.length,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={inChattingListStyle} onClick={enterChatApiHandler}>
      <span>{props.channelName}</span>
      {props.channelType === "PRIVATE" && (
        <span className="ml-1.5 text-[#939393]">3</span>
      )}
    </li>
  );
};

export default DmGroupChatList;
