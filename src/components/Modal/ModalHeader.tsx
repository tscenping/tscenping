import crossBtn from "../../img/Chatting/crossBtn.svg";
import { useModalState } from "../../store/modal";

interface ModalHeaderProps {
  title: string;
}
const ModalHeader = (props: ModalHeaderProps): JSX.Element => {
  const { setModalName } = useModalState();

  return (
    <>
      <header className="w-full flex flex-col justify-center items-center">
        <img
          src={crossBtn}
          alt=""
          className="self-end cursor-pointer"
          onClick={() => {
            setModalName(null);
          }}
        />
        <strong className="text-[16px] font-[Pretendard-SemiBold]">
          {props.title}
        </strong>
      </header>
    </>
  );
};

export default ModalHeader;
