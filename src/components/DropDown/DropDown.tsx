import { useEffect } from "react";
import { Dropdown } from "../../types/DropDownTypes";
import DropDownChat from "./Chat/DropDownChat";
import NormalDropDown from "./Normal/NormalDropDown";

export default function DropDown(props: Dropdown) {
  useEffect(() => {
    console.log(props.dropDonwType);
  }, []);
  const content: { [key: string]: JSX.Element } = {
    NORMAL: <NormalDropDown prop={props.normalProp} />,
    CHAAT: <DropDownChat />,
    NONE: <div className="hidden">zxc</div>,
  };
  return (
    <ul className="bg-[#EAEAEA] text-[#6C6C6C] rounded-md">
      {content[props.dropDonwType]}
    </ul>
  );
}
