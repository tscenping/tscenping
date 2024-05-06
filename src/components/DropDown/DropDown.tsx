import { useRef } from "react";
import { Dropdown } from "../../types/DropDownTypes";
import DropDownChat from "./Chat/DropDownChat";
import NormalDropDown from "./Normal/NormalDropDown";
import useOutsideClickHandler from "hooks/useOutsideClick";

export default function DropDown(props: Dropdown) {
  const content: { [key: string]: JSX.Element } = {
    NORMAL: <NormalDropDown prop={props.dropDownProp} />,
    CHAT: <DropDownChat props={props.dropDownProp} />,
    NONE: <div className="hidden">zxc</div>,
  };

  const dropDownRef = useRef<HTMLUListElement>(null);
  const closeDorpDownHandler = () => {
    props.setDropDownType("NONE");
  };

  useOutsideClickHandler(dropDownRef, closeDorpDownHandler);

  return (
    <ul
      className="bg-[#EAEAEA] text-[#6D6D6D] rounded-[10px] flex-row items-center justify-center p-1 
          absolute right-0 top-10 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] z-20"
      ref={dropDownRef}
    >
      {content[props.dropDonwType]}
    </ul>
  );
}
