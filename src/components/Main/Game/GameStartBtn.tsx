import { GameType } from "./GameTypeSelector";

interface GameTypeSelectorProps {
  gameType: "NORMAL" | "LADDER";
}
export default function GameStartBtn(props: GameTypeSelectorProps) {
  return (
    <div className="flex gap-2 w-full relative max-w-[520px] min-h-10 items-center justify-center">
      <div
        className={` absolute h-full w-3/4 flex items-center justify-center  ${
          props.gameType === GameType.LADDER ? "visible" : "invisible"
        } `}
      >
        <button
          className={`relative  rounded-[12px] w-2/3 h-12 bg-customGreen  text-black min-w-[220px] font-bold hover:scale-105 ${
            props.gameType === GameType.LADDER ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 ease-in-out`}
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
          className={`rounded-[12px] w-1/2 h-full bg-customGreen  text-black min-w-[100px] font-bold hover:scale-105 ${
            props.gameType === GameType.NORMAL ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 ease-in-out`}
        >
          Matching
        </button>
        <button
          className={`rounded-[12px] w-1/2 h-full bg-customGreen  text-black min-w-[100px] font-bold hover:scale-105 ${
            props.gameType === GameType.NORMAL ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 ease-in-out`}
        >
          Inviting
        </button>
      </div>
    </div>
  );
}
