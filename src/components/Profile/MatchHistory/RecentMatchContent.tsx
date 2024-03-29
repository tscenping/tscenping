import defailtImg from "../../../../src/img/Main/DefaultPorfileImg.svg";
import winIcon from "../../../img/Profile/Win.svg";
import loseIcon from "../../../img/Profile/Lose.svg";

interface RecentMatchContentProps {
  leftName: string;
  leftScore: number;
  rightName: string;
  rightScore: number;
}

const svgWidth = 24;
const svgHeight = 24;
const contentStyle = "w-1/5 flex items-center justify-center";

export default function RecentMatchContent({
  leftName,
  leftScore,
  rightName,
  rightScore,
}: RecentMatchContentProps) {
  return (
    <li className="relative flex items-center justify-around w-full px-3 ">
      <img src={winIcon} alt="loseIcon" className="absolute left-0" width={8} />

      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
      />
      <p className={`${contentStyle}`}>{leftName}</p>
      {/* <p className="w-1/6"></p> */}
      <p className={`${contentStyle}`}>
        {leftScore} : {rightScore}
      </p>
      {/* <p className="w-1/6"></p> */}
      <p className={`${contentStyle}`}>{rightName}</p>
      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
      />
    </li>
  );
}
