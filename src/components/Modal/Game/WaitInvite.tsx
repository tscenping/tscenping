import React, { useEffect } from "react";
import lodingImg from "../../../img/Modal/ModalLoading.svg";
import { useModalState } from "store/modal";
import { useGameInviteState } from "store/game";
import useAxios from "hooks/useAxios";

const WaitInvite = () => {
  const { inviteType, setGameInviteState } = useGameInviteState();
  const instance = useAxios();
  const { setModalName } = useModalState();
  const inviteCancelHandler = () => {
    setModalName(null);
    if (inviteType.invitationId === -1) return;
    instance.delete(`game/invite/${inviteType.invitationId}`);
    setGameInviteState({ invitationId: -1 });
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setModalName(null);
      setGameInviteState({ invitationId: -1 });
    }, 10000);
    return () => {
      clearTimeout(timeOutId);
    };
  });

  return (
    <>
      <div className="flex flex-col items-center w-full gap-5 mt-5 justify-normal">
        <img src={lodingImg} alt="loding" className="items-center w-1/3" />
        <div>응답을 기다리는중</div>
        <button
          className="rounded-[12px] min-h-7 w-1/2 bg-customGreen  text-black min-w-[100px] font-bold hover:scale-105"
          onClick={() => {
            inviteCancelHandler();
          }}
        >
          취소
        </button>
      </div>
    </>
  );
};

export default WaitInvite;
