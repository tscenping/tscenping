interface DropDownChatProps {
  id: number;
  nickname: string;
  isFriend: boolean;
  channelUserId: number;
  isBlocked: boolean;
  myChannelUserType: "OWNER" | "ADMIN" | "MEMBER";
  channelUserType: "OWNER" | "ADMIN" | "MEMBER";
  setDropDownType: (dropDownType: "NORMAL" | "CHAT" | "NONE") => void;
  setChannelUserType: (v: "OWNER" | "ADMIN" | "MEMBER") => void;
}

interface Prop{
  prop: DropDownChatProps  ;
}

export default function DropDownChat() {
  return <></>;
}
