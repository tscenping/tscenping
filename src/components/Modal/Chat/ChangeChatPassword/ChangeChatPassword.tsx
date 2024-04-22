import useAxios from "hooks/useAxios";
import { FormEvent, useRef, useState } from "react";
import { useChat } from "store/chat";
import { useModalState, useNoticeModalState } from "store/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PasswordInput from "./PasswordInput";
import { ChatPasswordErrorTypes } from "types/ChatTypes";

const ChangeChatPassword = (): JSX.Element => {
  const instance = useAxios();
  const { inChatInfo, setInChatInfo } = useChat();
  const { setModalName } = useModalState();
  const { setContent } = useNoticeModalState();
  const queryClient = useQueryClient();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [passwordError, setPasswordError] =
    useState<ChatPasswordErrorTypes>("");

  const changePasswordChatApiHandler = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!passwordRef.current?.value) {
      setPasswordError("NOPASSWORD");
      return;
    }

    if (passwordRef.current?.value && passwordRef.current?.value.length <= 7) {
      setPasswordError("LESSPASSWORD");
      return;
    }

    try {
      const response = await instance.patch("/channels/password", {
        channelId: inChatInfo.inChat,
        password: passwordRef.current?.value,
      });
      if (response.status === 200) {
        setModalName("notice");
        if (inChatInfo.channelType === "PROTECTED")
          setContent("채팅방 비밀번호가 변경되었어요.");
        else setContent("비밀 채팅으로 변경되었어요.");
        setInChatInfo({ ...inChatInfo, channelType: "PROTECTED" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation({
    mutationFn: changePasswordChatApiHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["open-password"] });
    },
  });

  return (
    <>
      <span className="text-base font-[Pretendard-SemiBold]">
        채팅방 비밀번호를 설정해주세요.
      </span>
      <form className="pt-7" onSubmit={mutate}>
        <PasswordInput
          passwordRef={passwordRef}
          passwordError={passwordError}
        />
        <button className="bg-white text-black w-full rounded-[20px] py-2 text-base mr-5">
          확인
        </button>
      </form>
    </>
  );
};

export default ChangeChatPassword;
