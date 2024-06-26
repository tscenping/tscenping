import Container from "../components/Util/Container";
import MatchBtn from "../components/Main/Game/MatchBtn";
import Ranking from "../components/Main/Ranking/Ranking";
import MainProfile from "../components/Main/Profile/Profile";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useChat } from "store/chat";
import ChatLog from "components/Chatting/InChat/ChatLog";

export default function Main() {
  const queryClient = useQueryClient();
  const { inChatInfo } = useChat();

  const fetchData = async () => {
    try {
      const data = await queryClient.fetchQuery({ queryKey: ["rankingData"] });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  });

  return (
    <Container>
      <div id="chatUserListModal" />
      {inChatInfo.inChat ? (
        <ChatLog />
      ) : (
        <section className="relative flex flex-col w-full h-full pt-5">
          <MainProfile />
          <MatchBtn />
          <Ranking />
        </section>
      )}
    </Container>
  );
}
