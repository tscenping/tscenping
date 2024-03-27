import Block from "../Function/Block";
import Friend from "../Function/Friend";
import Profile from "../Function/Profile";
import { DropDownNormal } from "../../../types/DropDownTypes";

interface DropDownNormalProps {
  prop?: DropDownNormal | null;
}

export default function NormalDropDown({ prop }: DropDownNormalProps) {
  return (
    <>
      <Friend isFriend={prop?.isFriend} isBlocked={prop?.isBlocked} />
      <Block isBlocked={prop?.isBlocked} />
      <Profile />
    </>
  );
}
