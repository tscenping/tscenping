import defailtImg from "../../../../src/img/Main/DefaultPorfileImg.svg";
import winIcon from "../../../img/Profile/Win.svg";
import loseIcon from "../../../img/Profile/Lose.svg";

interface RecentMatchContentProps {
  leftname: string;
  leftavatar: string;
  leftscore: number;
  rightname: string;
  rightscore: number;
  rightavatar: string;
}

const svgWidth = 24;
const svgHeight = 24;
const contentStyle =
  "w-1/4 flex items-center justify-center font-[League-SpartanMedium]";

export default function RecentMatchContent({
  leftname,
  leftavatar,
  leftscore,
  rightname,
  rightscore,
  rightavatar,
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
    <li className="relative flex items-center justify-around w-full px-3 h-1/6 ">
      {leftscore > rightscore ? (
        <img
          src={winIcon}
          alt="loseIcon"
          className="absolute left-0"
          width={8}
        />
      ) : (
        <img
          src={loseIcon}
          alt="loseIcon"
          className="absolute left-0"
          width={8}
        />
      )}

      <img
        src={leftavatar === null ? defailtImg : leftavatar}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
        className="object-cover w-auto rounded-full h-9/10 aspect-square"
      />
      <p className={`${contentStyle}`}>{truncateText(leftname, 8)}</p>
      <p className={`${contentStyle} font-[League-SpartanBold]`}>
        {leftscore} : {rightscore}
      </p>
      <p className={`${contentStyle}`}>{truncateText(rightname, 8)}</p>
      <img
        src={rightavatar === null ? defailtImg : rightavatar}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
        className="ml-2 object-cover w-auto rounded-full h-9/10 aspect-square"
      />
    </li>
  );
}
