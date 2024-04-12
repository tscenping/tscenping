import { NavLink, useLocation } from "react-router-dom";
import main from "../../img/Footer/main.svg";
import friends from "../../img/Footer/friends.svg";
import chatting from "../../img/Footer/chatting.svg";
import chatting2 from "../../img/Footer/chatting2.svg";
import notice from "../../img/Footer/notice.svg";
import inMain from "../../img/Footer/inMain.svg";
import inFriends from "../../img/Footer/inFriends.svg";
import inChatting from "../../img/Footer/inChatting.svg";
import inChatting2 from "../../img/Footer/inChatting2.svg";

const Footer = (): JSX.Element => {
  const footerIconStyle =
    "w-[28px] sm:w-[28px] md:w-[32px] lg:w-[36px] xl:w-[40px] 2xl:w-[44px]";
  const location = useLocation();
  const pathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const footerStyle =
    pathName === "login" ||
    pathName === "userinfo" ||
    pathName === "logincallback" ||
    pathName === "googlecallback"
      ? "hidden"
      : "z-5 bottom-0 p-6 w-full bg-[#3F3F3F]";

  return (
    <footer className={footerStyle}>
      <nav>
        <ul className="flex justify-around">
          <li>
            <NavLink to="/">
              <img
                src={pathName === "" ? inMain : main}
                alt="home page router"
                className={footerIconStyle}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/friends">
              <img
                src={pathName === "friends" ? inFriends : friends}
                alt="friends page router"
                className={footerIconStyle}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/inchatting">
              <img
                src={pathName === "inchatting" ? inChatting : chatting}
                alt="chatting page router"
                className={footerIconStyle}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/chatting">
              <img
                src={pathName === "chatting" ? inChatting2 : chatting2}
                alt=""
                className={footerIconStyle}
              />
            </NavLink>
          </li>
          <li>
            <img src={notice} alt="" className={footerIconStyle} />
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
