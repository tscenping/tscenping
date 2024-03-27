interface InChattingListProps {
  channelId: number;
  channelName: string;
  channelType: string;
}

const InChattingList = (props: InChattingListProps): JSX.Element => {
  const inChattingListStyle =
    "bg-[#424242] p-3 px-4 rounded-[20px] my-[24px] cursor-pointer font-[Pretendard-SemiBold]";

  return (
    <li className={inChattingListStyle}>
      <span>{props.channelName}</span>
      {props.channelType === "PRIVATE" && (
        <span className="ml-[8px] text-[#939393]">3</span>
      )}
    </li>
  );
};

export default InChattingList;
