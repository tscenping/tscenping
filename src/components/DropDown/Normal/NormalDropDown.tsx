import Block from "../Function/Block";
import Friend from "../Function/Friend";
import { DropDownNormal } from "../../../types/DropDownTypes";
import Game from "../Function/Game";
import Chat from "../Function/Chat";

interface DropDownNormalProps {
  prop?: DropDownNormal | null;
}

export default function NormalDropDown({ prop }: DropDownNormalProps) {
  const dropdownArray = [
    {
      component: (
        <Friend
          isFriend={prop?.isFriend}
          isBlocked={prop?.isBlocked}
          nickname={prop?.nickname}
          userId={prop?.id}
          setDropDownType={prop?.setDropDownType}
        />
      ),
      key: "dropDownFriend",
    },
    {
      component: (
        <Block
          isBlocked={prop?.isBlocked}
          nickname={prop?.nickname}
          userId={prop?.id}
          setDropDownType={prop?.setDropDownType}
        />
      ),
      key: "dropDownBlock",
    },
    { component: <Game />, key: "dropDownProfile" },
    {
      component: <Chat nickname={prop?.nickname} userId={prop?.id} />,
      key: "dropDownChat",
    },
  ];
  return (
    <>
      {dropdownArray.map((item) => (
        <li
          className="flex items-center justify-strat gap-3 px-3 py-0.5 cursor-pointer hover:scale-x-105 hover:bg-[#C6C6C6] rounded-[5px]"
          key={item.key}
        >
          {item.component}
        </li>
      ))}
    </>
  );
}
