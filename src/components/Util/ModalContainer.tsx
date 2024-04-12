import { createPortal } from "react-dom";
import { useModalState } from "../../store/modal";
import CreateChatMode from "../Modal/CreateChatMode";
import CreateChatInfo from "../Modal/CreateChatInfo/CreateChatInfo";
import Notice from "../Modal/Notice";
import ChatUserList from "../Modal/ChatUserList";
import ModalProfile from "../Modal/Profile/ModalProfile";
import ModalLoding from "../Modal/ModalLoding";
import ModalConfirm from "../Modal/ModalConfirm";
import { useEffect } from "react";

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
  useEffect(() => {
    if (modalName !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [modalName])
  const modalContent: { [key: string]: JSX.Element | null } = {
    createChatMode: <CreateChatMode />,
    createChatInfo: <CreateChatInfo />,
    profile: <ModalProfile />,
    loding: <ModalLoding />,
    confirm:<ModalConfirm/>,
    notice: <Notice />,
    chatUserList: <ChatUserList />,
  };
  const modalStyle =
    modalName === null
      ? "hidden"
      : modalName !== "profile"
      ? "flex flex-col jusfify-content center fixed top-1/2 left-1/2 xs:min-w-[320px] min-w-[376px] md:min-w-[417px] max-w-[376px] text-center text-white px-4 py-5 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-[#404040] rounded-[20px] text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-['Pretendard-SemiBold']"
      : "flex w-screen-50 min-w-[325px] max-w-[700px] flex-col jusfify-content center fixed top-1/2 left-1/2 text-center text-white px-4 py-5 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#404040] rounded-[20px] text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-['Pretendard-SemiBold']";

  const chatUserListModalStyle =
    "absolute right-0 top-0 w-9/12 h-full bg-[#2d2d2d] z-20";

  return (
    <>
      <div
        className={`${
          modalName === "chatUserList" ? chatUserListModalStyle : modalStyle
        }`}
      >
        {modalName ? modalContent[modalName] : null}
      </div>
    </>
  );
};

const ModalContainer = (): JSX.Element => {
  const { modalName } = useModalState();
  return (
    <>
      {createPortal(
        <ModalLayout />,
        document.getElementById("modalLayout") as HTMLElement
      )}
      {modalName === "chatUserList"
        ? createPortal(
            <ModalContent />,
            document.getElementById("chatUserListModal") as HTMLElement
          )
        : createPortal(
            <ModalContent />,
            document.getElementById("modalContent") as HTMLElement
          )}
    </>
  );
};

export default ModalContainer;
