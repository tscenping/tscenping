import InChattingList from "./InChattingList";

interface InChattingListsProps {
  tabState: string;
}

const dummyDataEntire = [
  {
    channelId: 1,
    name: "아무나 들어오지 마세요!",
    channelType: "PRIVATE",
  },
  {
    channelId: 2,
    name: "HIM",
    channelType: "DM",
  },
  {
    channelId: 3,
    name: "YUBCHOI",
    channelType: "DM",
  },
  {
    channelId: 4,
    name: "JANG-CHO",
    channelType: "DM",
  },
  {
    channelId: 5,
    name: "JIYUN",
    channelType: "DM",
  },
  {
    channelId: 6,
    name: "사적인 방입니다!",
    channelType: "PRIVATE",
  },
];

const InChattingLists = (props: InChattingListsProps): JSX.Element => {
  return (
    <ul>
      {dummyDataEntire.map((el) =>
        (props.tabState === "GROUP" && el.channelType === "PRIVATE") ||
        (props.tabState === "ONETOONE" && el.channelType === "DM") ? (
          <InChattingList
            key={el.channelId}
            channelId={el.channelId}
            channelName={el.name}
            channelType={el.channelType}
          />
        ) : null
      )}
    </ul>
  );
};

export default InChattingLists;
