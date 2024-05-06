import { useState } from "react";
import userSetting from "img/Chatting/setting.svg";
import { ChatUsersInfoTypes } from "types/ChatTypes";
import { DropDownTypes } from "types/DropDownTypes";
import DropDown from "components/DropDown/DropDown";
// import { ChannelUserTypes } from "types/ChatTypes";
import { useMyData } from "store/profile";
import { useChat } from "store/chat";
import defaultProfile from "img/Login/defaultProfileImage.svg";

const ChatUserList = (props: ChatUsersInfoTypes): JSX.Element => {
  const [dropDownType, setDropDownType] = useState<DropDownTypes>("NONE");
  // const [channelUserType, setChannelUserType] = useState<ChannelUserTypes>(
  //   props.channelUserType
  // );
  const { inChatInfo } = useChat();
  const { myData } = useMyData();
  return (
    <li
      className="flex items-center justify-between mb-3.5 sm:mb-4 lg:mb-4.5 xl:mb-5 relative"
      key={props.channelUserId}
    >
      <section className="flex items-center">
        <img
          src={props.avatar ? props.avatar : defaultProfile}
          className="w-10 h-10 object-cover mr-3 rounded-full sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
        />
        <span className="font-[Pretendard] text-sm sm:text-base lg:text-lg xl:text-2xl">
          {props.nickname}
        </span>
      </section>
      {myData.nickname !== props.nickname &&
        inChatInfo.channelType !== "DM" && (
          <img
            src={userSetting}
            className="cursor-pointer w-0.5 sm:w-1"
            onClick={() => {
              if (dropDownType === "NONE") setDropDownType("CHAT");
              if (dropDownType === "CHAT") setDropDownType("NONE");
            }}
          />
        )}
      {dropDownType !== "NONE" && (
        <DropDown
          dropDonwType={dropDownType}
          setDropDownType={setDropDownType}
          dropDownProp={{
            id: props.userId,
            nickname: props.nickname,
            isFriend: props.isFriend,
            channelUserId: props.channelUserId,
            isBlocked: props.isBlocked,
            myChannelUserType: props.myChannelUserType,
            channelUserType: props.channelUserType,
            setDropDownType: setDropDownType,
          }}
        />
      )}
    </li>
  );
};

export default ChatUserList;
