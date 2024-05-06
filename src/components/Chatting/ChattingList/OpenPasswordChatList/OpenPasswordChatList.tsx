import useAxios from "hooks/useAxios";
import publicChatting from "img/Chatting/publicChatting.svg";
import passwordChatting from "img/Chatting/passwordChatting.svg";
import { useChat, useChatSetting, useMessage } from "store/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalState } from "store/modal";
import { ChatType, ChatUsersInfoTypes } from "types/ChatTypes";
import {
  collection,
  getDocs,
  Firestore,
  query,
  where,
  updateDoc,
} from "firebase/firestore/lite";
import { useMyData } from "store/profile";
import firebaseSetting from "func/settingFirebase";

interface AllChattingListProps {
  channelId: number;
  channelName: string;
  channelType: ChatType;
  userCount: number;
  isJoined: boolean;
}

const OpenPasswordChatList = (props: AllChattingListProps): JSX.Element => {
  const instance = useAxios();
  const { setInChatInfo, inChatInfo } = useChat();
  const { setChatSetting } = useChatSetting();
  const queryClient = useQueryClient();
  const { setModalName } = useModalState();
  const { myData } = useMyData();
  const { setParseChatLog } = useMessage();
  const { db } = firebaseSetting();

  const inChattingListStyle =
    "bg-[#424242] p-3 px-4 rounded-[20px] mt-6 cursor-pointer font-[Pretendard-SemiBold] ";

  async function getMessages(db: Firestore) {
    if (myData.nickname) {
      const messagesCol = collection(db, "chat");
      const orderMessage = query(messagesCol);
      const messageSnapshot = await getDocs(orderMessage);
      const messageData = messageSnapshot.docs.find((doc) => {
        return doc.data().channelId === props.channelId;
      });
      return messageData?.data().messages;
    }
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

  async function fetchDataUser(userCount: number) {
    const userCollectionRef = collection(db, "chat");
    const q = query(
      userCollectionRef,
      where("channelId", "==", props.channelId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;
      await updateDoc(docRef, {
        userCount: userCount,
      });
    });
  }

  const joinChatApiHandler = async () => {
    if (props.channelType === "PROTECTED" && props.isJoined === false) {
      setModalName("passwordChatJoin");
      setInChatInfo({
        ...inChatInfo,
        readyToChat: props.channelId,
        readyToChatTitle: props.channelName,
      });
      return;
    }

    try {
      const response = await instance({
        method: props.isJoined || props.isJoined === undefined ? "get" : "post",
        url:
          props.isJoined || props.isJoined === undefined
            ? `/channels/enter/${props.channelId}`
            : "/channels/join",
        data: props.isJoined
          ? undefined
          : { channelId: props.channelId, password: null },
      });

      if (response.status === 200 || response.status === 201) {
        setParseChatLog([]);
        const chatUsers = response.data.channelUsers.map(
          (el: ChatUsersInfoTypes) => ({
            ...el,
          })
        );
        setInChatInfo({
          ...inChatInfo,
          chatTitle: props.channelName,
          inChat: props.channelId,
          chatUsersCount: response.data.channelUsers.length,
          chatUsers: chatUsers,
          channelType: props.channelType,
          myChannelUserType: response.data.myChannelUserType,
          isJoined: response.status === 200 ? true : false,
        });
        setModalName(null);
        if (response.status === 200) {
          fetchData();
        }
        if (response.status === 201) {
          fetchDataUser(response.data.channelUsers.length);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const joinChannelMutation = useMutation({
    mutationFn: joinChatApiHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["open-password"] });
    },
  });

  const joinChatHandler = () => {
    if (props.isJoined || props.isJoined === undefined) {
      joinChatApiHandler();
      return;
    }
    if (!props.isJoined) {
      setChatSetting(
        props.channelName,
        "채팅방에 입장하시겠어요?",
        "입장하기",
        () => joinChannelMutation.mutate()
      );
      setModalName("chatSetting");
    }
  };

  return (
    <li
      className={`flex ${inChattingListStyle} w-full justify-between items-center`}
      onClick={joinChatHandler}
    >
      <section className="flex items-center">
        <img
          src={
            props.channelType === "PUBLIC" ? publicChatting : passwordChatting
          }
          alt="public chatting room"
        />
        <span className="ml-4">{props.channelName}</span>
      </section>
      <span className="ml-[8px] text-[#939393]">{props.userCount} / 10</span>
    </li>
  );
};

export default OpenPasswordChatList;
