import userSetting from "img/Chatting/setting.svg";
import { ChatUsersInfoTypes } from "types/ChatTypes";

const ChatUserList = (props: ChatUsersInfoTypes): JSX.Element => {
  return (
    <li
      className="flex items-center justify-between mb-3.5 sm:mb-4 lg:mb-4.5 xl:mb-5 "
      key={props.channelUserId}
    >
      <section className="flex items-center">
        <img
          src={props.avatar}
          className="rounded-full w-10 sm:w-12 lg:w-14 xl:w-16 mr-3"
        />
        <span className="font-[Pretendard] text-sm sm:text-base lg:text-lg xl:text-2xl">
          {props.nickname}
        </span>
      </section>
      <img src={userSetting} className="cursor-pointer w-0.5 sm:w-1" />
    </li>
  );
};

export default ChatUserList;
