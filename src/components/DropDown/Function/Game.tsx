import { DropDownProps, DropDownTypes } from "types/DropDownTypes";
import useDorpDownIcon from "../../../hooks/useDropDownIcon";
import { dropDownStyle } from "../Normal/NormalDropDown";

interface Props {
  props: DropDownProps;
}

export default function Game({ props }: Props) {
  const gameIcon = useDorpDownIcon({ types: "GAME" });
  return (
    <li
      className={`${dropDownStyle} ${props.isBlocked ? "hidden" : ""}`}
      onClick={() => {
        props.setDropDownType!("NONE");
      }}
    >
      {gameIcon} 게임초대
    </li>
  );
}
