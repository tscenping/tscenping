import publicChatting from "../../../../img/Chatting/publicChatting.svg";
import passwordChatting from "../../../../img/Chatting/passwordChatting.svg";

interface AllChattingListProps {
  channelId: number;
  channelName: string;
  channelType: string;
  userCount: number;
  isJoined: boolean;
}

const AllChattingList = (props: AllChattingListProps): JSX.Element => {
  const inChattingListStyle =
    "bg-[#424242] p-3 px-4 rounded-[20px] mt-6 cursor-pointer font-[Pretendard-SemiBold] ";

  return (
    <li
      className={`flex ${inChattingListStyle} w-full justify-between items-center`}
    >
      <section className="flex items-center">
        <img
          src={
            props.channelType === "PUBLIC" ? publicChatting : passwordChatting
          }
          alt="public chatting room"
        />
        <span className="ml-4">{props.channelName}</span>
      </section>
      <span className="ml-[8px] text-[#939393]">{props.userCount} / 10</span>
    </li>
  );
};

export default AllChattingList;
