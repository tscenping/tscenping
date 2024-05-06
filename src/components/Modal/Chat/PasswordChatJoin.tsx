import React, { useState, useRef } from "react";
import { useChat } from "store/chat";
import useAxios from "hooks/useAxios";
import { useModalState } from "store/modal";
import { ChatPasswordErrorTypes } from "types/ChatTypes";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ChatUsersInfoTypes } from "types/ChatTypes";

const PasswordChatJoin = (): JSX.Element => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<ChatPasswordErrorTypes>("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setModalName } = useModalState();
  const { inChatInfo, setInChatInfo } = useChat();
  const instance = useAxios();
  const queryClient = useQueryClient();

  const passwordApiHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password.length || password.length < 8) {
      if (!password.length) setError("NOPASSWORD");
      else if (password.length < 8) setError("LESSPASSWORD");
      setPassword("");
      if (passwordRef.current?.value) passwordRef.current.value = "";
      return;
    }

    try {
      const response = await instance.post("/channels/join", {
        channelId: inChatInfo.readyToChat,
        password: password,
      });

      if (response.status === 201) {
        const chatUsers = response.data.channelUsers.map(
          (el: ChatUsersInfoTypes) => ({
            ...el,
          })
        );
        setModalName(null);
        setInChatInfo({
          ...inChatInfo,
          chatTitle: inChatInfo.readyToChatTitle,
          inChat: inChatInfo.readyToChat,
          chatUsers: chatUsers,
          channelType: "PROTECTED",
          chatUsersCount: response.data.channelUsers.length,
          myChannelUserType: response.data.myChannelUserType,
          isJoined: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation({
    mutationFn: passwordApiHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["open-password"] });
    },
  });

  const passwordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <h1 className="text-base font-[Pretendard-ExtraBold] pt-5">
        {inChatInfo.readyToChatTitle}
      </h1>
      <span className="text-base font-[Pretendard-SemiBold]">
        채팅에 참여하려면 비밀번호를 입력해주세요.
      </span>
      <form className="pt-7" onSubmit={mutate}>
        <section className="flex items-center mb-3">
          <input
            type="password"
            className="w-full font-[Pretendard-Medium] rounded-[20px] py-2.5 px-5 border-[1px] border-solid border-[#919191] outline-none bg-[#4f4f4f] text-white  focus:border-customGreen text-base sm:text-lg md:text-xl"
            id="chatPassword"
            maxLength={16}
            ref={passwordRef}
            onChange={passwordInputHandler}
          />
          <span className="absolute right-10 text-[#919191] font-[Pretendard-Regular] text-base">
            {password.length}/16
          </span>
        </section>
        <p className="text-sm sm:text-base text-start w-full mb-5 text-customGreen h-4">
          {error === "NOPASSWORD" && "* 비밀번호를 입력해주세요."}
          {error === "LESSPASSWORD" &&
            "* 채팅방 비밀번호는 8 ~ 16자 사이로 작성해주세요."}
        </p>
        <button className="bg-white text-black w-full rounded-[20px] py-2 text-base mr-5">
          확인
        </button>
      </form>
    </>
  );
};

export default PasswordChatJoin;
