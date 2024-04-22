import { useModalState, useCreateChatModeState } from "store/modal";
import { useLocation } from "react-router-dom";
import ModalHeader from "../../ModalHeader";
import passwordChat from "img/Chatting/passwordChattingW.svg";
import openChat from "img/Footer/chatting2.svg";
import checkedPassword from "img/Chatting/checkedPassword.svg";
import checkedOpen from "img/Chatting/checkedOpen.svg";
import oneOnOne from "img/Chatting/oneonone.svg";
import group from "img/Chatting/group.svg";
import checkedOneOnOne from "img/Chatting/checkedoneonone.svg";
import checkedGroup from "img/Chatting/checkedGroup.svg";
import { useInviteMode } from "store/chat";
import { useEffect } from "react";

const CreateChatMode = (): JSX.Element => {
  const location = useLocation();
  const pathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const { setMode } = useInviteMode();
  const { setModalName } = useModalState();
  const { setCreateChatType, createChatType } = useCreateChatModeState();
  const buttonStyle =
    "flex py-3 px-5 items-center border-solid border-[1px] rounded-[20px] font-[Pretendard-SemiBold] text-base";

  const createChatInfo = () => {
    if (createChatType) setModalName("createChatInfo");
  };

  useEffect(() => {
    setCreateChatType("");
  }, []);

  return (
    <>
      <ModalHeader title="새로운 채팅방" />
      <section className="flex w-full pt-6 pb-8 justify-evenly">
        <button
          className={`${buttonStyle} ${
            createChatType === "PROTECTED" || createChatType === "DM"
              ? "text-[#404040] bg-white"
              : ""
          } `}
          onClick={() => {
            if (pathName === "inchatting") setCreateChatType("DM");
            else setCreateChatType("PROTECTED");
          }}
        >
          {createChatType === "PROTECTED" || createChatType === "DM" ? (
            <img
              src={
                pathName === "inchatting" ? checkedOneOnOne : checkedPassword
              }
              alt="checked password chat"
              className="mr-[16px]"
            />
          ) : (
            <img
              src={pathName === "inchatting" ? oneOnOne : passwordChat}
              alt="create password chat"
              className="mr-[16px]"
            />
          )}
          {pathName === "inchatting" ? "1:1 채팅" : "비밀채팅"}
        </button>
        <button
          className={`${buttonStyle} ${
            createChatType === "PUBLIC" || createChatType === "PRIVATE"
              ? "text-[#404040] bg-white"
              : ""
          } `}
          onClick={() => {
            if (pathName === "inchatting") setCreateChatType("PRIVATE");
            else setCreateChatType("PUBLIC");
          }}
        >
          {createChatType === "PUBLIC" || createChatType === "PRIVATE" ? (
            <img
              src={pathName === "inchatting" ? checkedGroup : checkedOpen}
              alt="checked open chat"
              className="mr-[16px]"
            />
          ) : (
            <img
              src={pathName === "inchatting" ? group : openChat}
              alt="create open chat"
              className="mr-[16px]"
            />
          )}
          {pathName === "inchatting" ? "그룹채팅" : "오픈채팅"}
        </button>
      </section>
      <section className="flex justify-center py-1">
        <button
          className={`w-full rounded-[20px] text-black font-[Pretendard-SemiBold] py-3 text-base ${
            createChatType ? "bg-customGreen" : "bg-white"
          }`}
          onClick={() => {
            if (createChatType === "DM") {
              setMode(true);
              setModalName(null);
            } else createChatInfo();
          }}
        >
          확인
        </button>
      </section>
    </>
  );
};

export default CreateChatMode;
