import { Link } from "react-router-dom";
import defailtImg from "../../../img/Main/DefaultPorfileImg.svg";

const svgWidth = 60;
const svgHeight = 60;

export default function MainProfile() {
  return (
    <Link
      className="relative inline-flex flex-col items-center justify-center w-full max-w-5xl mt-10 gap-1.5 max-h-40 min-h-20"
      to="/profile"
    >
      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
      />
      <strong>Hyeongwoo</strong>
    </Link>
  );
}
