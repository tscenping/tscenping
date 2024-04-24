export type UserTypes = "OWNER" | "ADMIN" | "MEMBER";
export type ChannelTypes = "NORMAL" | "CHAT" | "NONE";

interface DropDownChatProps {
  id: number;
  nickname: string;
  isFriend: boolean;
  channelUserId: number;
  isBlocked: boolean;
  myChannelUserType: UserTypes;
  channelUserType: UserTypes;
  setDropDownType: (dropDownType: ChannelTypes) => void;
}

interface Prop {
  prop: DropDownChatProps;
}

export default function DropDownChat() {
  return <></>;
}
