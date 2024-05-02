import { DropDownProps, DropDownTypes } from "types/DropDownTypes";
import useDorpDownIcon from "../../../hooks/useDropDownIcon";
import { dropDownStyle } from "../Normal/NormalDropDown";
import { useModalState } from "store/modal";

interface Props {
  props: DropDownProps;
}

export default function Game({ props }: Props) {
  const gameIcon = useDorpDownIcon({ types: "GAME" });
  const { setModalName, setModalProps } = useModalState();
  return (
    <li
      className={`${dropDownStyle} ${props.isBlocked ? "hidden" : ""}`}
      onClick={() => {
        setModalName("gameInvite");
        setModalProps({
          nickname: props.nickname,
          confirmType: "game",
          id: props.id,
        });
        props.setDropDownType!("NONE");
      }}
    >
      {gameIcon} 게임초대
    </li>
  );
}
