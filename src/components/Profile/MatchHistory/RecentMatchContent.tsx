import defailtImg from "../../../../src/img/Main/DefaultPorfileImg.svg";

interface RecentMatchContentProps {
  leftName: string;
  leftScore: number;
  rightName: string;
  rightScore: number;
}

const svgWidth = 30;
const svgHeight = 30;

export default function RecentMatchContent({
  leftName,
  leftScore,
  rightName,
  rightScore,
}: RecentMatchContentProps) {
  return (
    <li className="flex justify-around">
      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
      />
      <p>{leftName}</p>
      <p>{leftScore}</p>
      <p>:</p>
      <p>{rightScore}</p>
      <p>{rightName}</p>
      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
      />
    </li>
  );
}
