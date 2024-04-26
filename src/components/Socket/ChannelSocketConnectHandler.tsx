import { useEffect } from "react";
import { useMyData } from "store/profile";
import { channelSocket } from "socket/ChannelSocket";

const ChannelSocketConnectHandler = () => {
  const { myData } = useMyData();
  useEffect(() => {
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
  return <></>;
};

export default ChannelSocketConnectHandler;
