import { createPortal } from "react-dom";
import { useModalState } from "../../store/modal";
import CreateChat from "../Modal/CreateChat";

const ModalLayout = (): JSX.Element => {
  const { setModalName } = useModalState();
  return (
    <>
      <div
        className="fixed w-full h-full top-0 bg-[#0000008f] z-10"
        onClick={() => {
          setModalName(null);
        }}
      ></div>
    </>
  );
};

const ModalContent = (): JSX.Element => {
  const { modalName } = useModalState();
  const modalContent: { [key: string]: JSX.Element | null } = {
    createChat: <CreateChat />,
  };
  const modalStyle =
    modalName === null
      ? "hidden"
      : "flex flex-col jusfify-content center fixed top-1/2 left-1/2 min-w-[353px] text-white px-4 py-5 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-[#404040] rounded-[20px] text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-['Pretendard-SemiBold']";

  return (
    <>
      <div className={modalStyle}>
        {modalName ? modalContent[modalName] : null}
      </div>
    </>
  );
};

const ModalContainer = (): JSX.Element => {
  return (
    <>
      {createPortal(
        <ModalLayout />,
        document.getElementById("modalLayout") as HTMLElement
      )}
      {createPortal(
        <ModalContent />,
        document.getElementById("modalContent") as HTMLElement
      )}
    </>
  );
};

export default ModalContainer;
