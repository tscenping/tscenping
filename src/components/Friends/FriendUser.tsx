import DropDown from "../DropDown/DropDown";
import userSetting from "../../img/Friends/user3dot.svg";
import { DropDownTypes } from "../../types/DropDownTypes";
import { useState } from "react";
import { UserStatusType } from "types/UserTypes";
import { useEffect } from "react";
import { channelSocket } from "socket/ChannelSocket";

interface FriendUserProps {
  nickname: string;
  avatar: string;
  id: number;
  status: UserStatusType;
  isFriend: boolean;
  isBlocked: boolean;
}

const FriendUser = (props: FriendUserProps): JSX.Element => {
  const [dropDownType, setDropDownType] = useState<DropDownTypes>("NONE");
  const [userStatus, setUserStatus] = useState<string>("");

  //채널소켓 "userStatus" 연결
  const updateUserStatus = (status: string) => {
    switch (status) {
      case "ONLINE":
        setUserStatus("before:bg-[#62f88d]");
        break;
      case "OFFLINE":
        setUserStatus("before:bg-white");
        break;
      case "INGAME":
        setUserStatus("before:bg-[#9b6dfc]");
        break;
    }
  };

  useEffect(() => {
    updateUserStatus(props.status);
    if (channelSocket.connected) {
      channelSocket.on("userStatus", (data) => {
        if (data.userId === props.id) {
          updateUserStatus(data.status);
        }
      });
      return () => {
        channelSocket.off("userStatus");
      };
    }
  }, []);
  //채널소켓 "userStatus" 연결

  return (
    <li
      key={props.id}
      className="relative flex justify-between w-full overflow-visible mb-7"
    >
      <section className="flex items-center">
        <section className="relative">
          <img
            src={props.avatar}
            className="w-10 rounded-full"
            alt="friend user profile"
          />
          <section
            className={`before:w-2.5 before:h-2.5 before:rounded-full before:absolute ${userStatus} before:right-[-2px] before:bottom-0.5`}
          />
        </section>
        <span className="ml-[16px] text-base font-[Pretendard]">
          {props.nickname}
        </span>
      </section>
      <img
        className="w-1 cursor-pointer"
        src={userSetting}
        onClick={() => {
          if (dropDownType === "NONE") setDropDownType("NORMAL");
          if (dropDownType === "NORMAL") setDropDownType("NONE");
        }}
      />
      {dropDownType !== "NONE" && (
        <DropDown
          dropDonwType={dropDownType}
          setDropDownType={setDropDownType}
          dropDownProp={{
            id: props.id,
            nickname: props.nickname,
            isFriend: props.isFriend,
            isBlocked: props.isBlocked,
            setDropDownType: setDropDownType,
          }}
        />
      )}
    </li>
  );
};

export default FriendUser;
