interface FriendProps {
  isBlocked?: boolean;
}

export default function Block({isBlocked}: FriendProps){
  const blockString = isBlocked
    ? "차단 해제"
    : "차단 하기"
  return (<li>
    {blockString}
  </li>)
}