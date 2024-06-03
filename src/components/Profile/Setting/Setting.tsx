import useAxios from "hooks/useAxios";
import { useModalState } from "store/modal";
import { useMyData } from "store/profile";
import { useChatSetting } from "store/chat";
import { channelSocket } from "socket/ChannelSocket";
import mfaOnToggle from "img/Profile/mfaOnToggle.svg";
import mfaOffToggle from "img/Profile/mfaOffToggle.svg";

export default function Setting() {
  const { setChatSetting } = useChatSetting();
  const { setModalName } = useModalState();
  const { setMyData, myData } = useMyData();
  const instance = useAxios();

  const logoutApiHandler = async () => {
    try {
      const response = await instance.patch("/auth/signout", {});
      if (response.status === 200) {
        channelSocket.disconnect();
        channelSocket.close();
        setMyData({ id: -1, nickname: "", avatar: "" });
        localStorage.clear();
        setModalName(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = async () => {
    setChatSetting("", "로그아웃 하시겠습니까?", "로그아웃", logoutApiHandler);
    setModalName("chatSetting");
  };

  console.log(myData);
  const mfaApiHandler = async () => {
    try {
      const response = await instance.patch("/auth/mfa", {});
      if (response.status === 200) {
        if (myData.isMfaEnabled) {
          setMyData({ ...myData, isMfaEnabled: false });
          setModalName("profile");
        } else await logoutApiHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mfaHandler = async () => {
    if (!myData.isMfaEnabled) {
      setChatSetting(
        "",
        "2차인증을 활성화 하시겠습니까? (활성화 시 로그인페이지로 이동해요.)",
        "활성화",
        mfaApiHandler
      );
      setModalName("chatSetting");
    } else {
      setChatSetting(
        "",
        "2차인증을 비활성화 하시겠습니까?",
        "비활성화",
        mfaApiHandler
      );
      setModalName("chatSetting");
    }
  };
  return (
    <ul className="flex flex-col justify-between w-full text-[#A9A9A9] gap-4">
      <li
        className="flex items-center justify-between cursor-pointer"
        onClick={mfaHandler}
      >
        <p>2차인증</p>
        <img
          src={myData.isMfaEnabled ? mfaOnToggle : mfaOffToggle}
          alt="mfa btn"
        />
      </li>
      <li
        className="flex items-center justify-between cursor-pointer"
        onClick={logoutHandler}
      >
        <p>로그아웃</p>
        <p>{">"}</p>
      </li>
    </ul>
  );
}
