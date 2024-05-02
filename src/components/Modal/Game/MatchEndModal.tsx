import { useEffect } from "react";
import { useMatchEndState, useModalState } from "store/modal";
import defaultImg from "../../../img/Main/DefaultPorfileImg.svg";
import ModalHeader from "../ModalHeader";
import { useMyData } from "store/profile";

export default function MatchEndModal() {
  const { matchEndData, setMatchEndData } = useMatchEndState();
  const { myData } = useMyData();
  const { setModalName } = useModalState();

  return (
    <>
      <ModalHeader title="게임종료" />
      {matchEndData !== null && (
        <section className="flex justify-around">
          <div className="flex flex-col gap-2">
            <img
              src={myData.avatar === null ? defaultImg : myData.avatar}
              alt="myImg"
              className="rounded-full h-15 w-15"
            />
            <p>{myData.nickname}</p>
          </div>
          <div className="flex items-center justify-center gap-3 text-3xl aspect-ratio">
            <h2 className={matchEndData.isWin ? "text-[#6DFCAF]" : ""}>{matchEndData.myScore}</h2>
            <p>:</p>
            <h2 className="">{matchEndData.rivalScore}</h2>
          </div>
          <div className="flex flex-col gap-2">
            <img
              src={
                matchEndData.rivalAvatar === null
                  ? defaultImg
                  : matchEndData.rivalAvatar
              }
              alt="rivalImg"
              className="rounded-full h-15 w-15"
            />
            <p>{matchEndData.rivalName}</p>
          </div>
        </section>
      )}
      <button
        onClick={() => {
          setModalName(null);
          setMatchEndData(null);
        }}
        className="w-full py-2 text-[#404040] bg-[#FFFFFF] rounded-full mt-3"
      >
        확인
      </button>
    </>
  );
}
