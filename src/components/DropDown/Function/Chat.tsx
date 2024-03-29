import useDorpDownIcon from "../../../hooks/useDropDownIcon";

export default function Chat(){
  const chatIcon = useDorpDownIcon({ types: "CHAT" });
  return <> 
    {chatIcon} 1:1대화
    </>;
}