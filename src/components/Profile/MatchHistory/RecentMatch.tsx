import RecentMatchContent from "./RecentMatchContent";

const dummyData = [
  { leftName: "him", leftScore: 3, rightName: "sang", rightScore: 2 },
  { leftName: "him", leftScore: 3, rightName: "sang", rightScore: 2 },
  { leftName: "him", leftScore: 3, rightName: "sang", rightScore: 2 },
  { leftName: "him", leftScore: 3, rightName: "sang", rightScore: 2 },
  { leftName: "him", leftScore: 3, rightName: "sang", rightScore: 2 },
];

export default function RecentMatch() {
  return (
    <ul className="flex flex-col gap-3 p-3 rounded-2xl bg-[#3A3A3A]">
      {dummyData.map((data, index) => (
        <RecentMatchContent
          key={index}
          leftName={data.leftName}
          leftScore={data.leftScore}
          rightName={data.rightName}
          rightScore={data.rightScore}
        />
      ))}
    </ul>
  );
}
