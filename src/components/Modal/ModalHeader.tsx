import crossBtn from "../../img/Chatting/crossBtn.svg";
import { useModalState } from "../../store/modal";

interface ModalHeaderProps {
  title: string;
}
const ModalHeader = (props: ModalHeaderProps): JSX.Element => {
  const { setModalName } = useModalState();

  return (
    <>
      <header className="flex flex-col items-center justify-center w-full">
        <img
          src={crossBtn}
          alt=""
          className="self-end cursor-pointer"
          onClick={() => {
            setModalName(null);
          }}
        />
        <strong className="font-[Pretendard-Bold] text-base md:text-lg lg:text-xl">
          {props.title}
        </strong>
      </header>
    </>
  );
};

export default ModalHeader;
