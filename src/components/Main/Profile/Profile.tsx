import { Link } from "react-router-dom";
import defailtImg from "../../../img/Main/DefaultPorfileImg.svg";

const svgWidth = 60;
const svgHeight = 60;

export default function MainProfile() {
  return (
    <Link
      className="relative inline-flex flex-col items-center justify-center w-full gap-1.5 h-1/4"
      to="/profile"
    >
      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
        className="object-cover w-1/6 rounded-full h-1/6"
      />
      <strong>Hyeongwoo</strong>
    </Link>
  );
}
