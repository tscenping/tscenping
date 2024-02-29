import {useState} from "react";
import GameTypeSelector, {GameType} from "./GameTypeSelector";
import GameStartBtn from "./GameStartBtn";
import SpecialCheck from "../../../img/Main/SpecialCheck.svg";
import SpecialUncheck from "../../../img/Main/SpecialUncheck.svg";


export default function MatchBtn() {
  const [gameType, setGameType] = useState<GameType>(GameType.NORMAL);
  const [isSpecial, setIsSpecial] = useState<boolean>(false);

    const changeSpecial = () =>{
      setIsSpecial((prev) => !prev)
    }

  return (
    <div className="flex w-full flex-col h-1/6 justify-center relative items-center gap-1 max-w-5xl max-h-40 ">
        <GameTypeSelector gameType={gameType} setGameType={setGameType} />
        <GameStartBtn gameType={gameType} />
        <div className="h-1/5">
        <label htmlFor="SpecialMode" className={`flex gap-3 hover:scale-130 cursor-pointer ${gameType === GameType.NORMAL ? "opacity-100" : "opacity-0 hidden"} transition-opacity duration-500 ease-in-out` }>
        <input type={"checkbox"} id="SpecialMode" className={`scale-150 mr-3 ${gameType === "NORMAL" ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in-out hidden` } checked={isSpecial} onChange={changeSpecial}/>
            <img src={isSpecial ? SpecialCheck : SpecialUncheck} className="scale-110 transition-transform duration-500 ease-in-out  cursor-pointer" alt={"체크박스"}/>
            Special Mode</label>
        </div>
    </div>
  );
}
