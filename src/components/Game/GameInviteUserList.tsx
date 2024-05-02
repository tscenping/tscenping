import userCheck from "img/Main/SpecialCheck.svg";
import userUncheck from "img/Main/SpecialUncheck.svg";
import defaultProfile from "img/Login/defaultProfileImage.svg";
import { useEffect, useState } from "react";
import { channelSocket } from "socket/ChannelSocket";

interface selectUserInfoTypes {
  nickname?: string;
  userId?: number;
}

interface UserListProps {
  nickname: string;
  avatar: string;
  id: number;
  status: "ONLINE" | "OFFLINE" | "";
  isFriend: boolean;
  isBlocked: boolean;
  selectNickname?: string;
  selectUserId?: number;
  setSelectNickname: (v: selectUserInfoTypes | null) => void;
}
const userStat: { [key: string]: string } = {
  ONLINE: "bg-[#62f88d]",
  OFFLINE: "bg-white",
  "": "bg-[#9b6dfc]",
};

const GameInviteUserList = (props: UserListProps): JSX.Element => {
  const [userStatus, setUserStatus] = useState<string>(userStat[props.status]);
  const selectUserHandler = (nickname: string) => {
    if (props.selectNickname === nickname) props.setSelectNickname(null);
    else {
      props.setSelectNickname({
        nickname: props.nickname,
        userId: props.id,
      });
    }
  };
  useEffect(() => {
    channelSocket.on("userStatus", (data) => {
      if (channelSocket.connected) {
        if (data.userId === props.id) {
          setUserStatus(userStat[data.status]);
        }
      }
    });
    return () => {
      channelSocket.off("userStatus");
    };
  }, [props]);
  return (
    <li
      className={`flex items-center justify-between  cursor-pointer mb-3 bg-[#515151] rounded-[15px] p-2 ${
        props.selectNickname === props.nickname ? " shadow-inner" : ""
      }`}
      onClick={() => {
        selectUserHandler(props.nickname);
      }}
    >
      <label className="flex items-center " htmlFor="user1">
        <img
          src={props.avatar ? props.avatar : defaultProfile}
          className="w-10 mr-3 rounded-full"
        />
        <span className="text-base">{props.nickname}</span>
      </label>
      <section>
        <input
          type="checkbox"
          id="user1"
          className="hidden"
          name="friendUser"
          value={props.nickname}
        />
        <section className={`w-2.5 h-2.5 ${userStatus} mr-3 rounded-full`} />
      </section>
    </li>
  );
};

export default GameInviteUserList;
