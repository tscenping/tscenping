import { useState } from "react";
import { useModalState } from "../../store/modal";
import ModalHeader from "./ModalHeader";
import passwordChat from "../../img/Chatting/passwordChattingW.svg";
import openChat from "../../img/Footer/chatting2.svg";
import checkedPassword from "../../img/Chatting/checkedPassword.svg";
import checkedOpen from "../../img/Chatting/checkedOpen.svg";

type chatType = "PASSWORD" | "OPEN" | null;

const CreateChat = (): JSX.Element => {
  const [createChatType, setCreateChatType] = useState<chatType>(null);
  const { setModalName } = useModalState();
  const buttonStyle =
    "flex py-3 px-5 items-center border-solid border-[1px] rounded-[20px] font-[Pretendard-SemiBold]";

  return (
    <>
      <ModalHeader title="새로운 채팅방" />
      <section className="w-full flex justify-evenly pb-8 pt-6">
        <button
          className={`${buttonStyle} ${
            createChatType === "PASSWORD" ? "text-[#404040] bg-white" : ""
          }`}
          onClick={() => {
            setCreateChatType("PASSWORD");
          }}
        >
          {createChatType === "PASSWORD" ? (
            <img
              src={checkedPassword}
              alt="checked password chat"
              className="mr-[16px]"
            />
          ) : (
            <img
              src={passwordChat}
              alt="create password chat"
              className="mr-[16px]"
            />
          )}
          비밀채팅
        </button>
        <button
          className={`${buttonStyle} ${
            createChatType === "OPEN" ? "text-[#404040] bg-white" : ""
          }`}
          onClick={() => {
            setCreateChatType("OPEN");
          }}
        >
          {createChatType === "OPEN" ? (
            <img
              src={checkedOpen}
              alt="checked open chat"
              className="mr-[16px]"
            />
          ) : (
            <img src={openChat} alt="create open chat" className="mr-[16px]" />
          )}
          오픈채팅
        </button>
      </section>
      <section className="flex justify-center py-1">
        <button
          className={`w-full rounded-[20px] text-black font-[Pretendard-SemiBold] py-3 ${
            createChatType ? "bg-customGreen" : "bg-white"
          }`}
        >
          확인
        </button>
      </section>
    </>
  );
};

export default CreateChat;
