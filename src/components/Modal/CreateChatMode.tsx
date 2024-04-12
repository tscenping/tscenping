import { useState } from "react";
import { useModalState, useCreateChatModeState } from "../../store/modal";
import ModalHeader from "./ModalHeader";
import passwordChat from "../../img/Chatting/passwordChattingW.svg";
import openChat from "../../img/Footer/chatting2.svg";
import checkedPassword from "../../img/Chatting/checkedPassword.svg";
import checkedOpen from "../../img/Chatting/checkedOpen.svg";

const CreateChatMode = (): JSX.Element => {
  const { setModalName } = useModalState();
  const { setCreateChatType, createChatType } = useCreateChatModeState();
  const buttonStyle =
    "flex py-3 px-5 items-center border-solid border-[1px] rounded-[20px] font-[Pretendard-SemiBold] text-base";

  const createChatInfo = () => {
    if (createChatType) setModalName("createChatInfo");
  };

  return (
    <>
      <ModalHeader title="새로운 채팅방" />
      <section className="w-full flex justify-evenly pb-8 pt-6">
        <button
          className={`${buttonStyle} ${
            createChatType === "PROTECTED" ? "text-[#404040] bg-white" : ""
          }`}
          onClick={() => {
            setCreateChatType("PROTECTED");
          }}
        >
          {createChatType === "PROTECTED" ? (
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
            createChatType === "PUBLIC" ? "text-[#404040] bg-white" : ""
          }`}
          onClick={() => {
            setCreateChatType("PUBLIC");
          }}
        >
          {createChatType === "PUBLIC" ? (
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
          className={`w-full rounded-[20px] text-black font-[Pretendard-SemiBold] py-3 text-base ${
            createChatType ? "bg-customGreen" : "bg-white"
          }`}
          onClick={() => {
            createChatInfo();
          }}
        >
          확인
        </button>
      </section>
    </>
  );
};

export default CreateChatMode;
