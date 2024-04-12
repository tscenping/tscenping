import { useRef } from "react";
import ModalHeader from "../ModalHeader";
import { useModalState, useCreateChatModeState } from "../../../store/modal";
import CreateChatInfoTitle from "./CreateChatInfoTitle";
import CreateChatInfoPassword from "./CreateChatInfoPassword";
import useAxios from "../../../hooks/useAxios";

const CreateChatInfo = (): JSX.Element => {
  const { setModalName } = useModalState();
  const { createChatType } = useCreateChatModeState();
  const instance = useAxios();

  const titleRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const createChatApiHandler = async () => {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ModalHeader title="새로운 채팅방" />
      <section className="my-5">
        <CreateChatInfoTitle titleRef={titleRef} />
        {createChatType === "PROTECTED" && (
          <CreateChatInfoPassword passwordRef={passwordRef} />
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
          onClick={createChatApiHandler}
        >
          생성
        </button>
      </section>
    </>
  );
};

export default CreateChatInfo;
