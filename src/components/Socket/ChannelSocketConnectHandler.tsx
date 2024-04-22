import { useEffect } from "react";
import { useMyData } from "store/profile";
import { channelSocket } from "socket/ChannelSocket";

const ChannelSocketConnectHandler = () => {
  const { myData } = useMyData();
  useEffect(() => {
    if (myData.nickname !== null && myData.nickname !== "") {
      channelSocket.connect();
    }
    return () => {
      if (myData.nickname === null && myData.nickname === "") {
        channelSocket.close();
        channelSocket.disconnect();
      }
    };
  }, [myData.nickname]);
  return <></>;
};

export default ChannelSocketConnectHandler;
