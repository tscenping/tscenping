import { useEffect, useRef, useState } from "react";
import Container from "../components/Util/Container";
import GameFrame from "../components/Game/GameFrame";
import Score from "../components/Game/Score";
import Player from "../components/Game/Player";

export default function Game() {
  return (
    <Container>
      <div className="flex flex-col w-full h-full">
        <Score />
        <Player />
        <div className="flex-grow">
          <GameFrame />
        </div>
      </div>
    </Container>
  );
}
