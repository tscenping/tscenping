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
        <Friend isFriend={prop?.isFriend} isBlocked={prop?.isBlocked} />
      ),
      key: "dropDownFriend",
    },
    { component: <Block isBlocked={prop?.isBlocked} />, key: "dropDownBlock" },
    { component: <Game />, key: "dropDownProfile" },
    { component: <Chat/> , key: "dropDownChat"}
  ];
  return (
    <>
      {dropdownArray.map((item) => (
        <li className="flex gap-2 px-3 py-1 cursor-pointer" key={item.key}>
          {item.component}
        </li>
      ))}
    </>
  );
}
