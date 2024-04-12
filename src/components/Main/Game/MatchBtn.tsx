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
    <div className="relative flex flex-col items-center justify-center w-full max-w-5xl gap-4 mb-12 h-1/4 max-h-40">
      <GameTypeSelector gameType={gameType} setGameType={setGameType} />
      <GameStartBtn gameType={gameType} />
      <div
        className={`absolute -bottom-8 h-1/5 ${
          gameType === GameType.NORMAL ? "visible" : "invisible"
        } `}
      >
        <label
          htmlFor="SpecialMode"
          className={`flex gap-3 hover:scale-130 cursor-pointer min-h-5 items-center justify-center transition-all duration-300 ease-in-out ${
            gameType === GameType.NORMAL ? "opacity-100" : "opacity-0"
          } `}
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
      </div>
    </div>
  );
}
