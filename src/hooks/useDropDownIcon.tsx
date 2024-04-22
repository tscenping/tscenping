import { DropDownIcons } from "../types/DropDownTypes";
import chat from "../img/DropDown/chat.svg";
import mute from "../img/DropDown/mute.svg";
import kick from "../img/DropDown/kick.svg";
import ban from "../img/DropDown/ban.svg";
import addFriend from "../img/DropDown/addFriend.svg";
import deleteFriend from "../img/DropDown/deleteFriend.svg";
import addAdmin from "../img/DropDown/addAdmin.svg";
import deleteAdmin from "../img/DropDown/deleteAdmin.svg";
import game from "../img/DropDown/game.svg";
import block from "../img/DropDown/block.svg";

interface DropDownIconProps {
  types: DropDownIcons;
}

const useDorpDownIcon = ({ types }: DropDownIconProps) => {
  const altString = "dropdown icon";
  const returnIcon: { [key in DropDownIcons]: string } = {
    MUTE: mute,
    KICK: kick,
    BAN: ban,
    A_FRIEND: addFriend,
    D_FRIEND: deleteFriend,
    A_ADMIN: addAdmin,
    D_ADMIN: deleteAdmin,
    GAME: game,
    CHAT: chat,
    A_BLOCK: block,
    D_BLOCK: block,
  };

  return <img src={returnIcon[types]} alt={altString} className="w-3 h-3" />;
};

export default useDorpDownIcon;
