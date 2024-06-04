import { useEffect, useState } from "react";
import Container from "../components/Util/Container";
import GameFrame from "../components/Game/GameFrame";
import Score from "../components/Game/Score";
import Player from "../components/Game/Player";
import { useGameInviteState, useGameMatchState } from "store/game";
import { gameSocket } from "socket/GameSocket";
import { MatchDataType, MatchEndType } from "types/GameTypes";
import { useNavigate } from "react-router-dom";
import { useMatchEndState, useModalState } from "store/modal";

export default function Game() {
  const { gameId } = useGameMatchState();
  const [matchData, setMatchData] = useState<MatchDataType>();
  const navigate = useNavigate();
  const { setMatchEndData } = useMatchEndState();
  const { setModalName } = useModalState();

  const { setGameInviteState } = useGameInviteState();

  const gameInitHandler = (Data: MatchDataType) => {
    console.log(Data, "ServerGameReady");
    setMatchData(Data);
    gameSocket.emit("clientGameReady", { gameId: gameId });
    console.log("clientGameReady");
  };

  const matchEndHandler = (data: MatchEndType) => {
    setMatchEndData(data);
    setModalName("matchEnd");
    navigate("/");
  };

  useEffect(() => {
    if (matchData === undefined) {
      navigate("/");
    }
    setGameInviteState({
      invitationId: -1,
      invitingUserNickname: "",
      gameType: "NORMAL_INVITE",
    });
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <div className="flex flex-col w-full h-full">
        {matchData && (
          <>
            <Score props={matchData} />
            <Player props={matchData} />
            <div className="flex-grow">
              <GameFrame props={matchData} />
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
