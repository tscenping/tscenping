import useAxios from "hooks/useAxios";
import { useModalState } from "../../../store/modal";
import { GameType } from "./GameTypeSelector";
import { channelSocket } from "socket/ChannelSocket";
import { useMatchSerchState } from "store/game";

interface GameTypeSelectorProps {
  gameType: "NORMAL" | "LADDER";
  isSpecial: boolean;
}
export default function GameStartBtn(props: GameTypeSelectorProps) {
  const { setModalName } = useModalState();
  const { setMatchSerchState } = useMatchSerchState();
  const instance = useAxios();

  // 게임 매칭창
  // 매칭 시 -> game 페이지
  // 매칭 안될 시 -> 매칭 취소
  // 매칭 취소 시 -> 매칭 취소

  const startGame = async () => {
    setMatchSerchState({
      gameType:
        props.gameType === "NORMAL"
          ? props.isSpecial
            ? "SPECIAL_MATCHING"
            : "NORMAL_MATCHING"
          : "LADDER",
    });
    setModalName("loding");
    await instance
      .post("/game/match", {
        gameType:
          props.gameType === "NORMAL"
            ? props.isSpecial
              ? "SPECIAL_MATCHING"
              : "NORMAL_MATCHING"
            : "LADDER",
      })
      .then(() => {
        console.log("match");
      });
    channelSocket.once("gameMatched", () => {});
  };
  return (
    <div className="flex gap-2 w-full relative max-w-[520px] items-center justify-center mt-4 h-2/3">
      <div
        className={`  h-full w-9/10 flex items-start justify-center  ${
          props.gameType === GameType.LADDER ? "visible" : "invisible"
        } `}
      >
        <button
          className={`relative h-6/10 rounded-[15px] w-full bg-customGreen text-[#2d2d2d] main-button-text hover:scale-105 font-[League-Spartan] ${
            props.gameType === GameType.LADDER ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 ease-in-out`}
          onClick={startGame}
        >
          Game Start
        </button>
      </div>
      <div
        className={` absolute h-full  w-9/10 gap-3 flex items-start justify-center ${
          props.gameType === GameType.NORMAL ? "visible" : "invisible"
        } `}
      >
        <button
          className={`rounded-[15px] w-1/2 main-button-text h-6/10 bg-customGreen cursor-pointer text-[#2d2d2d] min-w-[100px] font-bold hover:scale-105 font-[League-Spartan] ${
            props.gameType === GameType.NORMAL ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 ease-in-out`}
          onClick={startGame}
        >
          Matching
        </button>
        <button
          className={`rounded-[15px] w-1/2 main-button-text h-6/10 bg-customGreen cursor-pointer text-[#2d2d2d] min-w-[100px] font-bold hover:scale-105 font-[League-Spartan] ${
            props.gameType === GameType.NORMAL ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 ease-in-out`}
          onClick={() => {
            setModalName("gameInviting");
          }}
        >
          Inviting
        </button>
      </div>
    </div>
  );
}
