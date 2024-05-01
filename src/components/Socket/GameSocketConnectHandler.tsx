import { useEffect } from "react";
import { useMyData } from "store/profile";
import { gameSocket } from "socket/GameSocket";
import { useLocation, useNavigate } from "react-router-dom";

export default function GameSocketHandler() {
  // const { matchGameState } = useMatchGameState()
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    // console.log(matchGameState)
    // if (pathName === "/match" && matchGameState.gameId !== -1) {
    //   gameSocket.connect();
    //   gameSocket.on("connect", () => {
    //     console.log("gameSocket connect");
    //   });
    //   gameSocket.on("disconnect", () => {
    //     console.log("gameSocket disconnect");
    //     navigate("/");
    //   });
    //   // gameSocket.emit('gameRequest', { gameId: matchGameState.gameId })
    //   // gameSocket.on('connect', () => {
    //   //   console.log('game connect')
    //   // })
    // }
    // return () => {
    //   gameSocket.off("connect");
    //   gameSocket.off("disconnect");
    //   gameSocket.disconnect();
    // };
  }, [pathName]);
  return <></>;
}
