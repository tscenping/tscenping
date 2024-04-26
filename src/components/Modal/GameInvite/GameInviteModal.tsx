import SpecialCheck from "../../../img/Main/SpecialCheck.svg";
import SpecialUncheck from "../../../img/Main/SpecialUncheck.svg";
import { useState } from "react";
import ModalHeader from "../ModalHeader";
import { instance } from "components/Util/axios";

export default function GameInviteModal() {
  const [isSpecial, setIsSpecial] = useState<boolean>(false);
  const changeSpecial = () => {
    setIsSpecial((prev) => !prev);
  };

  const acceptHandler = async () => {
    try {
      await instance.post("/game/accept", { gameInvitationId: 1 });
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <>
      <ModalHeader title="Game Invite" />
      <div className="flex flex-col gap-3">
        님과 게임을 진행하시겠습니까?
        <label
          htmlFor="SpecialMode"
          className={`flex gap-3 hover:scale-130 cursor-pointer min-h-5 items-center justify-center transition-all duration-300 ease-in-out opacity-100 `}
        >
          <input
            type={"checkbox"}
            id="SpecialMode"
            className={`hidden`}
            checked={isSpecial}
            onChange={changeSpecial}
          />
          <img
            src={isSpecial ? SpecialCheck : SpecialUncheck}
            className="scale-110 cursor-pointer "
            alt={"체크박스"}
          />
          Special Mode
        </label>
        <section className="flex gap-3">
          <button
            className="rounded-[12px] w-1/2 bg-customGreen min-h-[40px]  
          text-black min-w-[100px] font-bold hover:scale-105 cursor-pointer"
            onClick={() => {
              // modalProps?.acceptFunction!();
              // if (prevName) setModalName(prevName);
              // else setModalName(null);
            }}
          >
            요청
          </button>
          <button
            className="rounded-[12px] w-1/2 bg-[#FFFFFF] min-h-[40px]
          text-black min-w-[100px] font-bold hover:scale-105 cursor-pointer"
            onClick={() => {
              // if (prevName) setModalName(prevName);
            }}
          >
            취소
          </button>
        </section>
      </div>
    </>
  );
}
