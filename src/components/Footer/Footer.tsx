import { NavLink, useLocation } from "react-router-dom";
import main from "img/Footer/main.svg";
import friends from "img/Footer/friends.svg";
import chatting from "img/Footer/chatting.svg";
import inMain from "img/Footer/inMain.svg";
import inFriends from "img/Footer/inFriends.svg";
import inChatting from "img/Footer/inChatting.svg";
import openPassword from "img/Footer/openPassword.svg";
import inOpenPassword from "img/Footer/checkedOpenPassword.svg";
import { useChat } from "store/chat";
import { useMessage } from "store/chat";
import { useInviteMode } from "store/chat";

const Footer = (): JSX.Element => {
  const { setEmptyInChatInfo, inChatInfo } = useChat();
  const footerIconStyle =
    "w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px] lg:w-[36px] lg:h-[36px] xl:w-[40px] xl:h-[40px] 2xl:w-[44px] 2xl:w-[44px]";
  const location = useLocation();
  const pathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const { setParseChatLog } = useMessage();
  const { setMode, mode } = useInviteMode();
  const hiddenPaths = [
    "login",
    "userinfo",
    "logincallback",
    "googlecallback",
    "game",
  ];
  const footerStyle = hiddenPaths.includes(pathName)
    ? "hidden"
    : "z-5 bottom-0 p-4 sm:p-5 md:p-6 w-full bg-[#3F3F3F]";

  const resetChatInfoHandler = () => {
    if (mode) setMode(false);
    if (inChatInfo.inChat) {
      setEmptyInChatInfo();
      setParseChatLog([]);
    }
  };

  return (
    <footer className={footerStyle}>
      <nav className="h-full">
        <ul className="flex justify-around items-center text-center">
          <li onClick={resetChatInfoHandler}>
            <NavLink to="/">
              <img
                src={pathName === "" ? inMain : main}
                alt="home page router"
                className={footerIconStyle}
              />
            </NavLink>
          </li>
          <li onClick={resetChatInfoHandler}>
            <NavLink to="/friends">
              <img
                src={pathName === "friends" ? inFriends : friends}
                alt="friends page router"
                className={footerIconStyle}
              />
            </NavLink>
          </li>
          <li onClick={resetChatInfoHandler}>
            <NavLink to="/inchatting">
              <img
                src={pathName === "inchatting" ? inChatting : chatting}
                alt="chatting page router"
                className={footerIconStyle}
              />
            </NavLink>
          </li>
          <li onClick={resetChatInfoHandler}>
            <NavLink to="/chatting">
              <img
                src={pathName === "chatting" ? inOpenPassword : openPassword}
                alt=""
                className={footerIconStyle}
              />
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
