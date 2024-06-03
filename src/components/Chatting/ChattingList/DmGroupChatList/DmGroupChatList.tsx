import useAxios from "hooks/useAxios";
import { useChat, useMessage } from "store/chat";
import { ChatType } from "types/ChatTypes";
import { collection, getDocs, Firestore, query } from "firebase/firestore/lite";
import firebaseSetting from "func/settingFirebase";
import { useMyData } from "store/profile";

interface InChattingListProps {
  channelId: number;
  channelName: string;
  channelType: ChatType;
  channelUserCount?: number;
}

const DmGroupChatList = (props: InChattingListProps): JSX.Element => {
  const inChattingListStyle =
    "bg-[#424242] p-3 px-4 rounded-[20px] mt-6 cursor-pointer font-[Pretendard-SemiBold]";
  const instance = useAxios();
  const { setInChatInfo, inChatInfo } = useChat();
  const { setParseChatLog } = useMessage();
  const { db } = firebaseSetting();
  const { myData } = useMyData();

  async function getMessages(db: Firestore) {
    const messagesCol = collection(db, "chat");
    const orderMessage = query(messagesCol);
    const messageSnapshot = await getDocs(orderMessage);
    const messageData = messageSnapshot.docs.find((doc) => {
      return doc.data().channelId === props.channelId;
    });
    return messageData?.data().messages;
  }

  async function fetchData() {
    const result = await getMessages(db);
    if (result) {
      const enterPoint = result.findLastIndex((message: any) => {
        return (
          message.nickname === myData.nickname && message.eventType === "JOIN"
        );
      });
      const sliceMessages = result.slice(enterPoint > 0 ? enterPoint : 0);
      if (sliceMessages) {
        const parsedMessage = sliceMessages.map((message: any) => ({
          avatar: message.avatar,
          nickname: message.nickname,
          message: message.message,
          time: message.time,
          eventType: message.eventType,
          channelId: message.channelId,
        }));
        setParseChatLog(parsedMessage);
      } else {
        setParseChatLog([]);
      }
    }
  }

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
          isJoined: true,
        });
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={inChattingListStyle} onClick={enterChatApiHandler}>
      <span>{props.channelName}</span>
      {props.channelType === "PRIVATE" && (
        <span className="ml-1.5 text-[#939393]">{props.channelUserCount}</span>
      )}
    </li>
  );
};

export default DmGroupChatList;
