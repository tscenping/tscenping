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
      console.log("socket connect");
      channelSocket.connect();
    }
    return () => {
      channelSocket.close();
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData.nickname]);
  return <>{/* <ChannelSocketHandler /> */}</>;
};

export default ChannelSocketConnectHandler;
