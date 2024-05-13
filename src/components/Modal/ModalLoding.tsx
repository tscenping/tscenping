import lodingImg from "../../img/Modal/ModalLoading.svg";
import { useModalState } from "../../store/modal";
import { useGameMatchState, useMatchSerchState } from "store/game";
import { instance } from "components/Util/axios";
import { useEffect } from "react";
import { channelSocket } from "socket/ChannelSocket";
import { GameMatchType } from "types/GameTypes";
import { useNavigate } from "react-router-dom";

export default function ModalLoding() {
  const { setModalName } = useModalState();
  const { setMatchSerchState, matchSerchProps } = useMatchSerchState();
  const { setGameMatchState } = useGameMatchState();
  const navigation = useNavigate();

  const matchCancelHandler = async () => {
    console.log("매칭 취소");
    await instance.delete(`/game/match/${matchSerchProps?.gameType}`);
    setMatchSerchState(null);
    setModalName(null);
  };

  const matchSuccessHandler = (gameData: GameMatchType) => {
    setGameMatchState(gameData);
    console.log("매칭 성공");
    setMatchSerchState(null);
    setModalName(null);
    navigation("/game");
  };

  useEffect(() => {
    channelSocket.once("gameMatched", matchSuccessHandler);
    return () => {
      channelSocket.off("gameMatched", matchSuccessHandler);
    };
  });

  return (
    <>
      <div className="flex flex-col items-center w-full gap-5 mt-5 justify-normal">
        <img src={lodingImg} alt="loding" className="items-center w-1/3" />
        <div>게임을 찾는중</div>
        <button
          className="rounded-[12px] min-h-7 w-1/2 bg-customGreen  text-black min-w-[100px] font-bold hover:scale-105"
          onClick={() => {
            matchCancelHandler();
          }}
        >
          취소
        </button>
      </div>
    </>
  );
}
