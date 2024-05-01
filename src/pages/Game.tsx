import { useEffect, useRef, useState } from "react";
import Container from "../components/Util/Container";
import GameFrame from "../components/Game/GameFrame";
import Score from "../components/Game/Score";
import Player from "../components/Game/Player";
import { useGameMatchState } from "store/game";
import { gameSocket } from "socket/GameSocket";
import { MatchDataType, MatchEndType } from "types/GameTypes";
import { useNavigate } from "react-router-dom";
import { useMatchEndState, useModalState } from "store/modal";

export default function Game() {
  const { gameId } = useGameMatchState();
  const [matchData, setMatchData] = useState<MatchDataType>();
  const navigate = useNavigate();
  const { setMatchEndData } = useMatchEndState();
  const {setModalName } = useModalState();

  const gameInitHandler = (Data: MatchDataType) => {
    setMatchData(Data);
    gameSocket.emit("clientGameReady", { gameId: gameId });
    console.log("clientGameReady");
  };

  const matchEndHandler = (data: MatchEndType) => {
    setMatchEndData(data);
    setModalName("matchEnd")
    navigate("/");
  };

  useEffect(() => {
    if (gameId === -1) return;
    gameSocket.connect();
    gameSocket.on("connect", () => {
      console.log("gameSocket connect");
    });

    gameSocket.once("serverGameReady", gameInitHandler);
    setTimeout(() => {
      gameSocket.emit("gameRequest", { gameId: gameId });
      console.log("gameRequest");
    }, 1000);

    gameSocket.on("game disconnect", () => {
      console.log("game disconnect");
    });
    gameSocket.once("matchEnd", matchEndHandler);
    return () => {
      gameSocket.disconnect();
      gameSocket.off("connect");
      gameSocket.off("serverGameReady", gameInitHandler);
      gameSocket.off("matchEnd", matchEndHandler);
    };
  }, []);
  return (
    <Container>
      <div className="flex flex-col w-full h-full">
        <Score props={matchData} />
        <Player props={matchData} />
        <div className="flex-grow">
          <GameFrame />
        </div>
      </div>
    </Container>
  );
}
