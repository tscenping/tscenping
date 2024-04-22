import { io, Socket } from "socket.io-client";

const channelSocketUrl: string | undefined =
  process.env.REACT_APP_SOCKET_CHANNELS;

if (!channelSocketUrl) {
  throw new Error("REACT_APP_SOCKET_CHANNELS is not defined");
}

export const channelSocket: Socket = io(channelSocketUrl, {
  autoConnect: false,
  reconnection: false, // true가 기본
  randomizationFactor: 1, // 0.5가 기본
  withCredentials: true,
});
