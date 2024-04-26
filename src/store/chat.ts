import { create } from "zustand";
import {
  MessageType,
  useChatProps,
  useChatSettingProps,
} from "../types/ChatTypes";

interface useChatInfoProps {
  inChatInfo: useChatProps;
  setInChatInfo: (inChatInfo: useChatProps) => void;
  setEmptyInChatInfo: () => void;
}

export const useChat = create<useChatInfoProps>((set) => ({
  inChatInfo: {
    inChat: 0,
    chatTitle: "",
    readyToChat: 0,
    readyToChatTitle: "",
    chatUsers: [],
    channelType: "",
    myChannelUserType: "",
    chatUsersCount: 1,
    isJoined: false,
  },
  setInChatInfo: (inChatInfo: useChatProps) => set({ inChatInfo }),
  setEmptyInChatInfo: () =>
    set({
      inChatInfo: {
        inChat: 0,
        chatTitle: "",
        readyToChat: 0,
        readyToChatTitle: "",
        chatUsers: [],
        channelType: "",
        myChannelUserType: "",
        chatUsersCount: 1,
        isJoined: false,
      },
    }),
}));

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

interface useInviteModeProps {
  mode: boolean;
  setMode: (v: boolean) => void;
}

export const useInviteMode = create<useInviteModeProps>((set) => ({
  mode: false,
  setMode: (mode: boolean) => set({ mode }),
}));

interface useMessageProps {
  chatLog: MessageType[];
  setChatLog: (v: MessageType) => void;
  setParseChatLog: (v: MessageType[]) => void;
}

export const useMessage = create<useMessageProps>((set) => ({
  chatLog: [],
  // setChatLog: (newMessage) =>
  //   set((state) => ({ chatLog: [...state.chatLog, newMessage] })),
  setChatLog: (newMessage) =>
    set((state) => {
      const updatedChatLog = [...state.chatLog, newMessage];
      if (updatedChatLog.length > 1000) {
        updatedChatLog.shift();
      }
      return { chatLog: updatedChatLog };
    }),
  setParseChatLog: (parseMessage: MessageType[]) =>
    set({ chatLog: parseMessage }),
}));
