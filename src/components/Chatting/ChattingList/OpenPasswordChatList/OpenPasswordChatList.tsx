import useAxios from "hooks/useAxios";
import publicChatting from "img/Chatting/publicChatting.svg";
import passwordChatting from "img/Chatting/passwordChatting.svg";
import { useChat, useChatSetting } from "store/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalState } from "store/modal";
import { ChatType, ChatUsersInfoTypes } from "types/ChatTypes";

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
  const inChattingListStyle =
    "bg-[#424242] p-3 px-4 rounded-[20px] mt-6 cursor-pointer font-[Pretendard-SemiBold] ";

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
        });

        setModalName(null);
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
