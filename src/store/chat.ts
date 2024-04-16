import { create } from "zustand";

type channelUserTypes = "OWNER" | "ADMIN" | "MEMBER" | "";

export interface ChatUsersInfoTypes {
  channelUserId: number;
  userId: number;
  nickname: string;
  avatar: string;
  isFriend: boolean;
  isBlocked: boolean;
  myChannelUserType: channelUserTypes;
  channelUserType: channelUserTypes;
}

interface useChatProps {
  inChat: number;
  chatTitle: string;
  readyToChat: number;
  readyToChatTitle: string;
  chatUsersCount: number;
  myChannelUserType: channelUserTypes;
  chatUsers: ChatUsersInfoTypes[];
}

interface useChatInfoProps {
  inChatInfo: useChatProps;
  setInChatInfo: (inChatInfo: useChatProps) => void;
}

export const useChat = create<useChatInfoProps>((set) => ({
  inChatInfo: {
    inChat: 0,
    chatTitle: "",
    readyToChat: 0,
    readyToChatTitle: "",
    chatUsers: [],
    myChannelUserType: "",
    chatUsersCount: 1,
  },
  setInChatInfo: (inChatInfo: useChatProps) => set({ inChatInfo }),
}));

interface useChatSettingProps {
  title: string;
  content: string;
  confirmComment: string;
  onConfirm: () => void;
  setChatSetting: (
    title: string,
    content: string,
    confirmComment: string,
    onConfirm: () => Promise<void> | void
  ) => void;
}

export const useChatSetting = create<useChatSettingProps>((set) => ({
  title: "",
  content: "",
  confirmComment: "",
  onConfirm: () => {},
  setChatSetting: (
    title: string,
    content: string,
    confirmComment: string,
    onConfirm: () => void
  ) => set({ title, content, confirmComment, onConfirm }),
}));
