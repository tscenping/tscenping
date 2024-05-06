import React from "react";
import { nanoid } from "nanoid";
import Friend from "../Function/Friend";
import Block from "../Function/Block";
import Game from "../Function/Game";
import Chat from "../Function/Chat";
import Admin from "../Function/Admin";
import Ban from "../Function/Ban";
import Kick from "../Function/Kick";
import Mute from "../Function/Mute";
import Profile from "../Function/Profile";
import { DropDownProps } from "types/DropDownTypes";

interface DropDownChatProps {
  props?: DropDownProps | undefined;
}

export default function DropDownChat({ props }: DropDownChatProps) {
  const dropdownArray = [
    {
      component: <Friend props={props!} />,
      key: nanoid(),
    },
    {
      component: <Block props={props!} />,
      key: nanoid(),
    },
    {
      component: <Game props={props!} />,
      key: nanoid(),
    },
    {
      component: <Chat props={props!} />,
      key: nanoid(),
    },
    {
      component: <Admin props={props!} />,
      key: nanoid(),
    },
    {
      component: <Ban props={props!} />,
      key: nanoid(),
    },
    {
      component: <Kick props={props!} />,
      key: nanoid(),
    },
    {
      component: <Mute props={props!} />,
      key: nanoid(),
    },
    {
      component: <Profile props={props!} />,
      key: nanoid(),
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
