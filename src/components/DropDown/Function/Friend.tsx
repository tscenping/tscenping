import useDorpDownIcon from "../../../hooks/useDropDownIcon";

interface FriendProps {
  isFriend?: boolean;
  isBlocked?: boolean;
}

export default function Friend({ isFriend, isBlocked }: FriendProps) {
  const addFriendIcon = useDorpDownIcon({ types: "A_FRIEND" });
  const deleteFriendIcon = useDorpDownIcon({ types: "D_FRIEND" });
  const friendString = isBlocked
    ? "친구 추가"
    : isFriend
    ? "친구 삭제"
    : "친구 추가";
  return <li className="flex gap-3 p-3 cursor-pointer"> 
    {friendString === "친구 추가" ? addFriendIcon : deleteFriendIcon}
    {friendString}
    </li>;
}
