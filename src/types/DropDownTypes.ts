import { ChatUserTypes } from "./ChatUserTypes";

export type DropDownTypes = "NORMAL" | "CHAT" | "NONE";
export type DropDownIcons =
  | "MUTE"
  | "KICK"
  | "BAN"
  | "A_FRIEND"
  | "D_FRIEND"
  | "A_ADMIN"
  | "D_ADMIN"
  | "GAME"
  | "CHAT"
  | "A_BLOCK"
  | "D_BLOCK";

export interface Dropdown {
  dropDonwType: DropDownTypes;
  setDropDownType: (dropDownType: DropDownTypes) => void;
  dropDownProp?: DropDownProps;
  avatar?: string;
}

export interface DropDownProps {
  id: number;
  nickname: string;
  isFriend: boolean;
  channelUserId?: number;
  isBlocked: boolean;
  myChannelUserType?: ChatUserTypes;
  channelUserType?: ChatUserTypes;
  setDropDownType: (dropDownType: DropDownTypes) => void;
  setChannelUserType?: (v: ChatUserTypes) => void;
}
