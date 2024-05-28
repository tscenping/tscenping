import { useMatchEndState, useModalState } from "store/modal";
import defaultImg from "../../../img/Main/DefaultPorfileImg.svg";
import ModalHeader from "../ModalHeader";
import { useMyData } from "store/profile";

export default function MatchEndModal() {
  const { matchEndData, setMatchEndData } = useMatchEndState();
  const { myData } = useMyData();
  const { setModalName } = useModalState();

  const winnerOuterStyle =
    "p-0.5 border-[1px] border-customGreen border-solid rounded-full shadow-[0_0_4px_0_rgb(109,252,175)]";
  const winnerInnerStyle = "border-[1px] border-customGreen";
  const loserInnerStyle = "border-[1px] border-solid border-[#757575]";

  return (
    <>
      <ModalHeader title="게임종료" />
      {matchEndData !== null && (
        <section className="flex items-center mb-8 justify-evenly">
          <div className="flex flex-col items-center gap-2">
            <section
              className={`${
                matchEndData.myScore > matchEndData.rivalScore
                  ? winnerOuterStyle
                  : ""
              }`}
            >
              <img
                src={myData.avatar === null ? defaultImg : myData.avatar}
                alt="myImg"
                className={`rounded-full h-10 w-10 ${
                  matchEndData.myScore > matchEndData.rivalScore
                    ? winnerInnerStyle
                    : loserInnerStyle
                }`}
              />
            </section>
            <p className="font-[Pretendard] text-sm text-[#d8d8d8]">
              {myData.nickname}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 text-3xl aspect-auto font-[League-Spartan] self-start mt-2">
            <h2
              className={`${
                matchEndData.isWin ? "text-[#6DFCAF]" : ""
              } text-4xl`}
            >
              {matchEndData.myScore}
            </h2>
            <p>:</p>
            <h2
              className={`${
                !matchEndData.isWin ? "text-[#6DFCAF]" : ""
              } text-4xl`}
            >
              {matchEndData.rivalScore}
            </h2>
          </div>
          <div className="flex flex-col items-center gap-2">
            <section
              className={`${
                matchEndData.rivalScore > matchEndData.myScore
                  ? winnerOuterStyle
                  : ""
              }`}
            >
              <img
                src={
                  matchEndData.rivalAvatar === null
                    ? defaultImg
                    : matchEndData.rivalAvatar
                }
                alt="rivalImg"
                className={`rounded-full h-10 w-10 ${
                  matchEndData.rivalScore > matchEndData.myScore
                    ? winnerInnerStyle
                    : loserInnerStyle
                }`}
              />
            </section>
            <p className="font-[Pretendard] text-sm text-[#d8d8d8]">
              {matchEndData.rivalName}
            </p>
          </div>
        </section>
      )}
      <button
        onClick={() => {
          setModalName(null);
          setMatchEndData(null);
        }}
        className="w-full py-2 text-[#404040] bg-[#FFFFFF] rounded-full text-base"
      >
        확인
      </button>
    </>
  );
}
