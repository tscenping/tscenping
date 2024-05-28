import { useModalState } from "../../../store/modal";
import { useMyData } from "../../../store/profile";
import defaultImg from "../../../img/Main/DefaultPorfileImg.svg";

const svgWidth = 60;
const svgHeight = 60;

export default function MainProfile() {
  const { setModalName, setModalProps } = useModalState();
  const { myData } = useMyData();
  return (
    <span className="relative flex flex-col items-center justify-center gap-1.5 h-1/6 max-h-[200px]">
      <img
        // src={defailtImg}

        src={myData.avatar === null ? defaultImg : myData.avatar}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
        className="object-cover rounded-[40%] cursor-pointer h-2/3 w-auto aspect-square"
        onClick={() => {
          // setModalProps({nickname: })
          setModalName("profile");
          setModalProps({ nickname: myData.nickname });
        }}
      />
      <strong
        className="cursor-pointer"
        onClick={() => {
          setModalName("profile");
          setModalProps({ nickname: myData.nickname });
        }}
      >
        {myData.nickname}
      </strong>
    </span>
  );
}
