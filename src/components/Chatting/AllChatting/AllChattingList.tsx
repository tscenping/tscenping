import publicChatting from "../../../img/Chatting/publicChatting.svg";
import passwordChatting from "../../../img/Chatting/passwordChatting.svg";

interface AllChattingListProps {
  channelId: number;
  channelName: string;
  channelType: string;
}

const AllChattingList = (props: AllChattingListProps): JSX.Element => {
  const inChattingListStyle =
    "bg-[#424242] p-3 px-4 rounded-[20px] my-[24px] cursor-pointer font-[Pretendard-SemiBold]";

  return (
    <li className={`flex ${inChattingListStyle} w-full justify-between`}>
      <section className="flex items-center">
        <img
          src={
            props.channelType === "PUBLIC" ? publicChatting : passwordChatting
          }
          alt="public chatting room"
        />
        <span className="ml-[8px]">{props.channelName}</span>
      </section>
      <span className="ml-[8px] text-[#939393]">1 / 10</span>
    </li>
  );
};

export default AllChattingList;
