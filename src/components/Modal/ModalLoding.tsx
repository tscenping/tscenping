import ModalHeader from "./ModalHeader";
import lodingImg from "../../img/Modal/ModalLoading.svg";
import { useModalState } from "../../store/modal";

export default function ModalLoding() {
  const { setModalName } = useModalState();
  return (
    <>
      <div className="flex flex-col items-center w-full gap-5 mt-5 justify-normal">
        <img src={lodingImg} alt="loding" className="items-center w-1/3" />
        <div>게임을 찾는중</div>
        <button
          className="rounded-[12px] w-1/2 bg-customGreen  text-black min-w-[100px] font-bold hover:scale-105"
          onClick={() => {
            setModalName(null);
          }}
        >
          취소
        </button>
      </div>
    </>
  );
}
