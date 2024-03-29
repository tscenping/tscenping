import RecentMatchContent from "./RecentMatchContent";
import winIcon from "../../../img/Profile/Win.svg";
import loseIcon from "../../../img/Profile/Lose.svg";

const dummyData = [
  { leftName: "hccim", leftScore: 3, rightName: "saㅋㅌng", rightScore: 2 },
  { leftName: "hm", leftScore: 3, rightName: "sanxg", rightScore: 2 },
  { leftName: "him", leftScore: 3, rightName: "sng", rightScore: 2 },
  { leftName: "hicm", leftScore: 3, rightName: "sg", rightScore: 2 },
  { leftName: "him", leftScore: 3, rightName: "sancccccccg", rightScore: 2 },
];

export default function RecentMatch() {
  return (
    <>
      <ul className="flex flex-col items-center w-full justify-center gap-3 p-3 rounded-2xl bg-[#3A3A3A]">
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
      <section className="flex items-center justify-start gap-5 font-extrabold">
        <div className="flex items-center justify-center gap-2">
          <img src={winIcon} alt="loseIcon" className="" width={12} />
          <p >Win</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img src={loseIcon} alt="loseIcon" className="" width={12}/>
          <p>Lose</p>
        </div>
      </section>
    </>
  );
}
