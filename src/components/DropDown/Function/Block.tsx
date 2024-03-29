import useDorpDownIcon from "../../../hooks/useDropDownIcon";

interface FriendProps {
  isBlocked?: boolean;
}

export default function Block({isBlocked}: FriendProps){
  const addBlockIcon = useDorpDownIcon({ types: "A_BLOCK" });
  const deleteBlockIcon = useDorpDownIcon({ types: "D_BLOCK" });
  const blockString = isBlocked
    ? "차단 해제"
    : "차단 하기"
  return (<>
    {blockString === "차단 하기" ? addBlockIcon : deleteBlockIcon}
    {blockString}
  </>)
}