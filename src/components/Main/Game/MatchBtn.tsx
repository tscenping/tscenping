import { useState } from "react";
import GameTypeSelector from "./GameTypeSelector";
import GameStartBtn from "./GameStartBtn";
import SpecialCheck from "../../../img/Main/SpecialCheck.svg";
import SpecialUncheck from "../../../img/Main/SpecialUncheck.svg";


export default function MatchBtn() {
  const [gameType, setGameType] = useState<"NORMAL" | "LADDER">("NORMAL");
  const [isSpecial, setIsSpecial] = useState<boolean>(false);

  const changeSpecial = () =>{
      setIsSpecial((prev) => !prev)
    }

  return (
    <div className="flex w-full flex-col h-1/6 justify-center relative items-center gap-1 max-w-5xl max-h-40 ">
      <GameTypeSelector gameType={gameType} setGameType={setGameType} />
        <div className="flex gap-2 h-2/5 w-2/5 justify-around">
        {/*{gameType === "LADDER" ? */}
            <button className={`absolute rounded-md bg-customGreen w-2/5 h-2/5 text-black min-w-[220px] font-bold hover:scale-105 ${gameType === "LADDER" ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in-out`}> Game Start </button>
        {/*:*/}
            <GameStartBtn gameType={gameType}/>

        {/*}*/}
        </div>
        <label htmlFor="SpecialMode" className={`flex gap-3 hover:scale-130 cursor-pointer ${gameType === "NORMAL" ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in-out` }>
        <input type={"checkbox"} id="SpecialMode" className={`scale-150 mr-3 ${gameType === "NORMAL" ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in-out hidden` } checked={isSpecial} onChange={changeSpecial}/>
            <img src={isSpecial ? SpecialCheck : SpecialUncheck} className="scale-110 transition-transform duration-500 ease-in-out  cursor-pointer"/>
            Special Mode</label>
    </div>
  );
}
