import { useState, useEffect } from "react";
import Container from "../components/Util/Container";
import FriendUsers from "../components/Friends/FriendUsers";
import BlockUsers from "../components/Friends/BlockUsers";
import { useChat } from "store/chat";
import ChatLog from "components/Chatting/InChat/ChatLog";
import useAxios from "hooks/useAxios";

const FriendsPage = (): JSX.Element => {
  const [pageSection, setPageSection] = useState("friend");
  const instance = useAxios();
  const { inChatInfo, setInChatInfo } = useChat();

  useEffect(() => {
    setInChatInfo({ ...inChatInfo, inChat: 0 });
  }, []);

  const gameInvitation = async () => {
    try {
      const response = await instance.post("/game/invite", {
        invitedUserId: 3,
        gameType: "NORMAL_INVITE",
      });
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <Container>
      <div id="chatUserListModal" />
      {inChatInfo.inChat ? (
        <ChatLog />
      ) : pageSection === "friend" ? (
        <FriendUsers setPageSection={setPageSection} />
      ) : (
        <BlockUsers setPageSection={setPageSection} />
      )}
    </Container>
  );
};

export default FriendsPage;
