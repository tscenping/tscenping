export type ChatPasswordErrorTypes = "NOPASSWORD" | "LESSPASSWORD" | "";

export type ChatType = "PUBLIC" | "PROTECTED" | "PRIVATE" | "DM" | "";

export type ChatTabStateType = "ALL" | "ENTERED" | "GROUP" | "DM";

export type ChannelUserTypes = "OWNER" | "ADMIN" | "MEMBER" | "";

export interface ChatData {
  name: string;
  channelType: ChatType;
  channelId: number;
  isJoined: boolean;
  userCount: number;
}

export type ChatNoticeEventType =
  | "JOIN"
  | "BAN"
  | "EXIT"
  | "KICK"
  | "MUTE"
  | "ADMIN"
  | "ADMIN_CANCEL"
  | "";

export interface MessageTypes {
  message: string;
  nickname: string;
  time?: string;
  avatar?: string;
  eventType?: ChatNoticeEventType;
}

export interface MessageType {
  nickname: string;
  avatar?: string | null;
  message?: string;
  time?: string;
  channelId: number;
  eventType?: ChatNoticeEventType;
}

export interface ChatUsersInfoTypes {
  channelUserId: number;
  userId: number;
  nickname: string;
  avatar: string;
  isFriend: boolean;
  isBlocked: boolean;
  myChannelUserType: ChannelUserTypes;
  channelUserType: ChannelUserTypes;
}

export interface useChatProps {
  inChat: number;
  chatTitle: string;
  readyToChat: number;
  readyToChatTitle: string;
  chatUsersCount: number;
  channelType: ChatType;
  myChannelUserType: ChannelUserTypes;
  chatUsers: ChatUsersInfoTypes[];
  isJoined: boolean;
  isMute: boolean;
}

export interface useChatSettingProps {
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
