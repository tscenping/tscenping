import AllChattingList from "./AllChattingList";

interface AllChattingListsProps {
  tabState: string;
}

const dummyDataEntire = [
  {
    channelId: 1,
    name: "아무나 들어오세요!",
    channelType: "PUBLIC",
  },
  {
    channelId: 2,
    name: "게임하실분🙆‍♂️",
    channelType: "PUBLIC",
  },
  {
    channelId: 3,
    name: "언제 다할까!",
    channelType: "PASSWORD",
  },
  {
    channelId: 4,
    name: "마크업 언제 끝내지!",
    channelType: "PUBLIC",
  },
  {
    channelId: 5,
    name: "소켓은 언제 붙이지!",
    channelType: "PASSWORD",
  },
  {
    channelId: 6,
    name: "아무나 들어오세요!",
    channelType: "PUBLIC",
  },
];

const dummyDataParticipated = [
  {
    channelId: 1,
    name: "아무나 들어오지 마세요!",
    channelType: "PUBLIC",
  },
  {
    channelId: 3,
    name: "컴포넌트만 몇시간 째냐!",
    channelType: "PASSWORD",
  },
  {
    channelId: 4,
    name: "마크업은 또 언제 다 할까!",
    channelType: "PUBLIC",
  },
  {
    channelId: 5,
    name: "소켓은 언제 붙이지!",
    channelType: "PASSWORD",
  },
  {
    channelId: 6,
    name: "API는 언제 붙이지!",
    channelType: "PUBLIC",
  },
];

const AllChattingLists = (props: AllChattingListsProps): JSX.Element => {
  return (
    <ul>
      {props.tabState === "ALL" && (
        <>
          {dummyDataEntire.map((el) => (
            <AllChattingList
              key={el.channelId}
              channelId={el.channelId}
              channelName={el.name}
              channelType={el.channelType}
            />
          ))}
        </>
      )}
      {props.tabState === "PARTICIPATED" && (
        <>
          {dummyDataParticipated.map((el) => (
            <AllChattingList
              key={el.channelId}
              channelId={el.channelId}
              channelName={el.name}
              channelType={el.channelType}
            />
          ))}
        </>
      )}
    </ul>
  );
};

export default AllChattingLists;
