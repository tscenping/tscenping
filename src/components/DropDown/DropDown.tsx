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
    <ul className="bg-[#EAEAEA] text-[#6D6D6D] rounded-[10px] flex-row items-center justify-center p-1 absolute right-0 top-10 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] z-20">
      {content[props.dropDonwType]}
    </ul>
  );
}
