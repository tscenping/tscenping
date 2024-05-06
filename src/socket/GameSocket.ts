import { io, Socket } from "socket.io-client";

const  gameSocketUrl: string | undefined =
  process.env.REACT_APP_SOCKET_GAMES;

if (!gameSocketUrl) {
  throw new Error("REACT_APP_SOCKET_GAMES is not defined");
}

export const gameSocket: Socket = io(gameSocketUrl, {
  autoConnect: false,
  reconnection: false, // true가 기본
  randomizationFactor: 1, // 0.5가 기본
  withCredentials: true,
});
