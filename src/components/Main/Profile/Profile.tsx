import { Link } from "react-router-dom";
import defailtImg from "../../../img/Main/DefaultPorfileImg.svg";
import { useModalState } from "../../../store/modal";

const svgWidth = 60;
const svgHeight = 60;

export default function MainProfile() {
  const { setModalName } = useModalState();
  return (
    <span className="relative  flex flex-col items-center justify-center gap-1.5 h-1/4 ">
      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
        className="object-cover w-1/6 rounded-full cursor-pointer h-1/6"
        onClick={() => {
          setModalName("profile");
        }}
      />
      <strong
        className="cursor-pointer"
        onClick={() => {
          setModalName("profile");
        }}
      >
        Hyeongwoo
      </strong>
    </span>
  );
}
