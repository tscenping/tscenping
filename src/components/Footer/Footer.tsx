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
  //   const iconHoverStyle = "duration-300 hover:scale-150";

  const location = useLocation();
  const pathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  return (
    <footer className="absolute bottom-0 p-6 w-full bg-[#3F3F3F]">
      <nav>
        <ul className="flex justify-around ">
          <li>
            <NavLink to="/">
              <img
                src={pathName === "" ? inMain : main}
                alt="home page router"
                // className={iconHoverStyle}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/friends">
              <img
                src={pathName === "friends" ? inFriends : friends}
                alt="friends page router"
                // className={iconHoverStyle}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/chatting">
              <img
                src={pathName === "chatting" ? inChatting : chatting}
                alt="chatting page router"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/entered">
              <img
                src={pathName === "entered" ? inChatting2 : chatting2}
                alt=""
                // className={iconHoverStyle}
              />
            </NavLink>
          </li>
          <li>
            <img
              src={notice}
              alt=""
              // className={iconHoverStyle}
            />
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
