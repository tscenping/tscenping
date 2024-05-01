import { useEffect, useState } from "react";
import { gameSocket } from "socket/GameSocket";
import { MatchDataType } from "types/GameTypes";

interface ScoreType {
  myScore: number;
  rivalScore: number;
}

export default function Score({props}: {props: MatchDataType}) {
  const [score, setScore] = useState<ScoreType>({ myScore: 0, rivalScore: 0 });

  const matchHandler = (data: ScoreType) => {
    setScore(data);
  };

  useEffect(() => {
    gameSocket.on("matchScore", matchHandler);
    return () => {
      gameSocket.off("matchScore", matchHandler);
    };
  });
  return (
    <h2 className="flex items-center justify-center mt-5 text-2xl font-bold">
      {score?.myScore} : {score?.rivalScore}
    </h2>
  );
}
