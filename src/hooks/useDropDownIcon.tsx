import { DropDownIcons } from "../types/DropDownTypes";
import dmIcon from "../img/DropDown/DM.svg";

interface DropDownIconProps {
  types: DropDownIcons;
}

// <img
//           src={crossBtn}
//           alt=""
//           className="self-end cursor-pointer"
//           onClick={() => {
//             setModalName(null);
//           }}
//         />

const useDorpDownIcon = ({ types }: DropDownIconProps) => {
  const altString = "dropdown icon";
  const returnIcon: { [key in DropDownIcons]: string } = {
    MUTE: dmIcon,
    KICK: dmIcon,
    BAN: dmIcon,
    A_FRIEND: dmIcon,
    D_FRIEND: dmIcon,
    A_ADMIN: dmIcon,
    D_ADMIN: dmIcon,
    GAME: dmIcon,
    CHAT: dmIcon,
    A_BLOCK: dmIcon,
    D_BLOCK: dmIcon,
  };
  return <img src={returnIcon[types]} alt={altString} className="" />;
};

export default useDorpDownIcon;
