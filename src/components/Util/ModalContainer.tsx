import { createPortal } from "react-dom";
import { useModalState } from "store/modal";
import CreateChatMode from "../Modal/Chat/CreateChat/CreateChatMode";
import CreateChatInfo from "../Modal/Chat/CreateChat/CreateChatInfo/CreateChatInfo";
import Notice from "../Modal/Notice";
import ChatUserLists from "../Modal/Chat/ChatUser/ChatUserLists";
import ModalProfile from "../Modal/Profile/ModalProfile";
import ModalLoding from "../Modal/ModalLoding";
import ModalConfirm from "../Modal/ModalConfirm";
import ChatSetting from "../Modal/Chat/ChatSetting";
import PasswordChatJoin from "../Modal/Chat/PasswordChatJoin";
import ChangeChatPassword from "../Modal/Chat/ChangeChatPassword/ChangeChatPassword";
import { useEffect } from "react";
import { useChat } from "store/chat";
import ModalSetting from "components/Modal/Setting/ModalSetting";
import GameInviteModal from "components/Modal/Game/GameInviteModal";
import MatchEndModal from "components/Modal/Game/MatchEndModal";
import { useInviteMode } from "store/chat";
import GameInvitingModal from "components/Modal/Game/GameInvitingModal";
import { useGameInviteState, useMatchSerchState } from "store/game";
import useAxios from "hooks/useAxios";
import WaitInvite from "components/Modal/Game/WaitInvite";

const ModalLayout = (): JSX.Element => {
  const { inChatInfo } = useChat();
  const { setModalName, modalName } = useModalState();
  const { setMatchSerchState, matchSerchProps } = useMatchSerchState();
  const { inviteType, setGameInviteState } = useGameInviteState();
  const { mode } = useInviteMode();
  const instance = useAxios();

  const gameCancelHandler = () => {
    if (inviteType.invitationId !== -1) {
      instance.delete(`game/invite/${inviteType.invitationId}`);
      setGameInviteState({ invitationId: -1 });
    }
    if (matchSerchProps !== null) {
      instance.delete(`/game/match/${matchSerchProps?.gameType}`);
      setMatchSerchState(null);
    }
  };

  const modalLayoutHandler = () => {
    if (mode) {
      setModalName(null);
      return;
    }
    gameCancelHandler();
    if (modalName === "chatSetting" && inChatInfo.inChat)
      setModalName("chatUserList");
    else setModalName(null);
  };

  return (
    <>
      <div
        className="fixed w-full h-full top-0 bg-[#0000008f] z-10"
        onClick={modalLayoutHandler}
      ></div>
    </>
  );
};

const ModalContent = (): JSX.Element => {
  const { modalName } = useModalState();
  useEffect(() => {
    if (modalName !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalName]);
  const modalContent: { [key: string]: JSX.Element | null } = {
    createChatMode: <CreateChatMode />,
    createChatInfo: <CreateChatInfo />,
    profile: <ModalProfile />,
    loding: <ModalLoding />,
    confirm: <ModalConfirm />,
    notice: <Notice />,
    chatUserList: <ChatUserLists />,
    chatSetting: <ChatSetting />,
    channelJoin: <ChatSetting />,
    passwordChatJoin: <PasswordChatJoin />,
    changeChatPassword: <ChangeChatPassword />,
    setting: <ModalSetting />,
    gameInvite: <GameInviteModal />,
    matchEnd: <MatchEndModal />,
    gameInviting: <GameInvitingModal />,
    waitInvite: <WaitInvite />,
  };
  const modalStyle =
    modalName === null
      ? "hidden"
      : modalName !== "profile"
      ? " z-20 flex flex-col jusfify-content center fixed top-1/2 left-1/2 xs:min-w-[320px] min-w-[376px] md:min-w-[417px] max-w-[376px] text-center text-white px-4 py-5 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-[#404040] rounded-[20px] text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-['Pretendard-SemiBold']"
      : " z-20 flex w-screen-50 min-w-[325px] max-w-[700px] flex-col jusfify-content center fixed top-1/2 left-1/2 text-center text-white px-4 py-5 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#404040] rounded-[20px] text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-['Pretendard-SemiBold']";

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
