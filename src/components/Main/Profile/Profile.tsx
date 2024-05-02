import { useModalState } from "../../../store/modal";
import { useMyData } from "../../../store/profile";
import defaultImg from "../../../img/Main/DefaultPorfileImg.svg";

const svgWidth = 60;
const svgHeight = 60;

export default function MainProfile() {
  const { setModalName, setModalProps } = useModalState();
  const { myData } = useMyData();

  return (
    <span className="relative flex flex-col items-center justify-center gap-1.5 h-1/4 mb-5">
      <img
        // src={defailtImg}

        src={myData.avatar === null ? defaultImg : myData.avatar}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
        className="object-cover rounded-[30px] cursor-pointer h-[70px] w-[70px] sm:h-[130px] sm:w-[130px] sm:rounded-[56px]"
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
