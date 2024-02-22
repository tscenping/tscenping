import { useState } from "react";
import GameTypeSelector from "./GameTypeSelector";

export default function MatchBtn() {
  const [gameType, setGameType] = useState<"NORMAL" | "LADDER">("NORMAL");

  return (
    <div className="flex flex-col justify-center items-center">
      <GameTypeSelector gameType={gameType} setGameType={setGameType} />
      <div>게임시작</div>
    </div>
  );
}
