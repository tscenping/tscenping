import { instance } from "components/Util/axios";
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

  // 게임 매칭창
  // 매칭 시 -> game 페이지
  // 매칭 안될 시 -> 매칭 취소
  // 매칭 취소 시 -> 매칭 취소

  const invitingFrined = () => {
    setModalName("gameInviting");
  };

  const startGame = async () => {
    console.log("매칭 시작");

    setMatchSerchState({
      gameType: props.gameType === "NORMAL" ? "NORMAL_MATCHING" : "LADDER",
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
      .then(() => {});
    channelSocket.once("gameMatched", () => {});
  };
  return (
    <div className="flex gap-2 w-full relative max-w-[520px] min-h-10 items-center justify-center mt-4">
      <div
        className={` absolute h-full w-full flex items-center justify-center  ${
          props.gameType === GameType.LADDER ? "visible" : "invisible"
        } `}
      >
        <button
          className={`relative rounded-[20px] w-2/3 h-16 bg-customGreen text-[#2d2d2d] min-w-[320px] text-2xl hover:scale-105 font-[League-Spartan] ${
            props.gameType === GameType.LADDER ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 ease-in-out`}
          onClick={startGame}
        >
          Game Start
        </button>
      </div>
      <div
        className={` absolute h-12 w-3/4 gap-3 flex items-center justify-center ${
          props.gameType === GameType.NORMAL ? "visible" : "invisible"
        } `}
      >
        <button
          className={`rounded-[12px] w-1/2 h-full bg-customGreen cursor-pointer text-[#2d2d2d] min-w-[100px] font-bold hover:scale-105 font-[League-Spartan] ${
            props.gameType === GameType.NORMAL ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 ease-in-out`}
          onClick={startGame}
        >
          Matching
        </button>
        <button
          className={`rounded-[12px] w-1/2 h-full bg-customGreen cursor-pointer text-[#2d2d2d] min-w-[100px] font-bold hover:scale-105 font-[League-Spartan] ${
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
