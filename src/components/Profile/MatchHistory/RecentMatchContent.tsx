import defailtImg from "../../../../src/img/Main/DefaultPorfileImg.svg";
import winIcon from "../../../img/Profile/Win.svg";
import loseIcon from "../../../img/Profile/Lose.svg";

interface RecentMatchContentProps {
  leftname: string;
  leftscore: number;
  rightname: string;
  rightscore: number;
}

const svgWidth = 24;
const svgHeight = 24;
const contentStyle = "w-1/4 flex items-center justify-center";

export default function RecentMatchContent({
  leftname,
  leftscore,
  rightname,
  rightscore,
}: RecentMatchContentProps) {
  const truncateText = function (str: string, maxLength: number) {
    if (!str) return;
    let len = 0;
    let truncatedStr = "";

    for (var i = 0; i < str.length; i++) {
      if (encodeURIComponent(str.charAt(i)).length > 1) {
        len++;
      }
      len++;

      if (len > maxLength) {
        truncatedStr += "...";
        break;
      } else {
        truncatedStr += str.charAt(i);
      }
    }

    return truncatedStr;
  };

  return (
    <li className="relative flex items-center justify-around w-full h-auto px-3 ">
      {leftscore > rightscore ? <img src={winIcon} alt="loseIcon" className="absolute left-0" width={8} /> : <img src={loseIcon} alt="loseIcon" className="absolute left-0" width={8} />}

      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
        className="min-w-[24px] max-w-[48px] w-1/10"
      />
      <p className={`${contentStyle}`}>{truncateText(leftname, 8)}</p>
      {/* <p className="w-1/6"></p> */}
      <p className={`${contentStyle}`}>
        {leftscore} : {rightscore}
      </p>
      {/* <p className="w-1/6"></p> */}
      <p className={`${contentStyle}`}>{truncateText(rightname, 8)}</p>
      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
        className="min-w-[24px] max-w-[48px] w-1/10"
      />
    </li>
  );
}
