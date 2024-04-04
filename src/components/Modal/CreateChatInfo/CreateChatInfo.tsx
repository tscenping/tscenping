import { useRef } from "react";
import ModalHeader from "../ModalHeader";
import { useModalState } from "../../../store/modal";
import CreateChatInfoTitle from "./CreateChatInfoTitle";
import CreateChatInfoPassword from "./CreateChatInfoPassword";

const CreateChatInfo = (): JSX.Element => {
  const { setModalName } = useModalState();

  const titleRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <ModalHeader title="새로운 채팅방" />
      <section className="my-5">
        <CreateChatInfoTitle titleRef={titleRef} />
        <CreateChatInfoPassword passwordRef={passwordRef} />
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
        <button className="w-1/2 py-2 bg-customGreen text-[#404040] text-base rounded-[20px] font-[Pretendard-SemiBold]">
          생성
        </button>
      </section>
    </>
  );
};

export default CreateChatInfo;
