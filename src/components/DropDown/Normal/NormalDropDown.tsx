import Block from "../Function/Block";
import Friend from "../Function/Friend";
import { DropDownProps } from "../../../types/DropDownTypes";
import Game from "../Function/Game";
import Chat from "../Function/Chat";
import React from "react";

interface DropDownNormalProps {
  prop?: DropDownProps | null;
}
export const dropDownStyle =
  "flex items-center justify-strat gap-3 px-3 py-0.5 cursor-pointer hover:scale-x-105 hover:bg-[#C6C6C6] rounded-[5px]";

export default function NormalDropDown({ prop }: DropDownNormalProps) {
  const dropdownArray = [
    {
      component: <Friend props={prop!} />,
      key: "dropDownFriend",
    },
    {
      component: <Block props={prop!} />,
      key: "dropDownBlock",
    },
    { component: <Game props={prop!} />, key: "dropDownProfile" },
    {
      component: <Chat props={prop!} />,
      key: "dropDownChat",
    },
  ];
  return (
    <>
      {dropdownArray.map((item) => (
        <React.Fragment key={item.key}>{item.component}</React.Fragment>
      ))}
    </>
  );
}
