import { useEffect } from "react";
import { useMyData } from "store/profile";
import { channelSocket } from "socket/ChannelSocket";
import ChannelSocketHandler from "./ChannelSocketHandler";

const ChannelSocketConnectHandler = () => {
  const { myData } = useMyData();
  console.log("socket connect");
  useEffect(() => {
    console.log(222)
    if (
      myData.nickname !== null &&
      myData.nickname !== "" &&
      !myData.isMfaEnabled
    ) {
      channelSocket.connect();
    }
    return () => {
      channelSocket.close();
    };
  }, [myData.nickname]);
  return (
    <>
      <ChannelSocketHandler />
    </>
  );
};

export default ChannelSocketConnectHandler;
