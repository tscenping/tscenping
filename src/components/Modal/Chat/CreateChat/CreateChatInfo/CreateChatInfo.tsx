import { useRef, useState } from "react";
import ModalHeader from "../../../ModalHeader";
import { useModalState, useCreateChatModeState } from "store/modal";
import CreateChatInfoTitle from "./CreateChatInfoTitle";
import CreateChatInfoPassword from "./CreateChatInfoPassword";
import useAxios from "hooks/useAxios";
import { useChat } from "store/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatPasswordErrorTypes } from "types/ChatTypes";

const CreateChatInfo = (): JSX.Element => {
  const queryClient = useQueryClient();
  const instance = useAxios();
  const { setModalName } = useModalState();
  const { createChatType } = useCreateChatModeState();
  const { setInChatInfo, inChatInfo } = useChat();
  const [titleError, setTitleError] = useState<boolean>(false);
  const [passwordError, setPasswordError] =
    useState<ChatPasswordErrorTypes>("");

  const titleRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const createChatApiHandler = async () => {
    if (!titleRef.current?.value.length) {
      setTitleError(true);
      return;
    }
    setTitleError(false);

    if (!passwordRef.current?.value && createChatType === "PROTECTED") {
      setPasswordError("NOPASSWORD");
      return;
    }

    if (
      createChatType === "PROTECTED" &&
      passwordRef.current?.value &&
      passwordRef.current?.value.length <= 7
    ) {
      setPasswordError("LESSPASSWORD");
      passwordRef.current.value = "";
      return;
    }
    try {
      const sendData = {
        name: titleRef.current?.value,
        channelType: createChatType,
        password:
          createChatType === "PUBLIC" ? null : passwordRef.current?.value,
      };
      const response = await instance.post(
        "/channels",
        JSON.stringify(sendData)
      );
      if (response.statusText === "Created") {
        setModalName(null);
        setInChatInfo({
          ...inChatInfo,
          inChat: response.data.channelId,
          chatUsers: response.data.channelUsers,
          chatUsersCount: response.data.channelUsers.length,
          myChannelUserType: response.data.myChannelUserType,
          chatTitle: titleRef.current?.value,
          channelType: createChatType,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createChatMutation = useMutation({
    mutationFn: createChatApiHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          `${
            createChatType === "DM" || createChatType === "PRIVATE"
              ? "group-dm"
              : "open-password"
          }`,
        ],
      });
    },
  });

  return (
    <>
      <ModalHeader title="새로운 채팅방" />
      <section className="my-5">
        <CreateChatInfoTitle titleRef={titleRef} titleError={titleError} />
        {createChatType === "PROTECTED" && (
          <CreateChatInfoPassword
            passwordRef={passwordRef}
            passwordError={passwordError}
          />
        )}
      </section>
      <section className="flex w-full justify-evenly">
        <button
          className="w-1/2 py-2 mr-5 bg-white text-[#404040] text-base rounded-[20px] font-[Pretendard-SemiBold]"
          onClick={() => {
            setModalName("createChatMode");
          }}
        >
          이전
        </button>
        <button
          className="w-1/2 py-2 bg-customGreen text-[#404040] text-base rounded-[20px] font-[Pretendard-SemiBold]"
          onClick={() => {
            createChatMutation.mutate();
          }}
        >
          생성
        </button>
      </section>
    </>
  );
};

export default CreateChatInfo;
