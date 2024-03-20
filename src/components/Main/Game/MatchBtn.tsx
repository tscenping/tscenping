import { useState } from "react";
import GameTypeSelector, { GameType } from "./GameTypeSelector";
import GameStartBtn from "./GameStartBtn";
import SpecialCheck from "../../../img/Main/SpecialCheck.svg";
import SpecialUncheck from "../../../img/Main/SpecialUncheck.svg";

export default function MatchBtn() {
  const [gameType, setGameType] = useState<GameType>(GameType.NORMAL);
  const [isSpecial, setIsSpecial] = useState<boolean>(false);

  const changeSpecial = () => {
    setIsSpecial((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-5xl gap-4 h-1/6 max-h-40">
      <GameTypeSelector gameType={gameType} setGameType={setGameType} />
      <GameStartBtn gameType={gameType} />
      <div className="h-1/5">
        <label
          htmlFor="SpecialMode"
          className={`flex gap-3 hover:scale-130 cursor-pointer min-h-5 items-center justify-center${
            gameType === GameType.NORMAL ? "opacity-100" : "opacity-0 hidden"
          } transition-all duration-500 ease-in-out`}
        >
          <input
            type={"checkbox"}
            id="SpecialMode"
            className={`scale-150 mr-3 items-center flex justify-center ${
              gameType === "NORMAL" ? "opacity-100" : "opacity-0"
            } transition-all duration-500 ease-in-out hidden`}
            checked={isSpecial}
            onChange={changeSpecial}
          />
          <img
            src={isSpecial ? SpecialCheck : SpecialUncheck}
            className="transition-all duration-500 ease-in-out scale-110 cursor-pointer"
            alt={"체크박스"}
          />
          Special Mode
        </label>
      </div>
    </div>
  );
}
