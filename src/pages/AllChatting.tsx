import { useState, useEffect } from "react";
import Container from "../components/Util/Container";
import ChattingListHeader from "../components/Chatting/ChattingList/ChattingListHeader";
import ChattingNaviList from "components/Chatting/ChattingList/ChattingNaviList";
import InChatting from "../components/Chatting/InChat/ChatLog";
import { useChat } from "../store/chat";
import OpenPasswordChatLists from "components/Chatting/ChattingList/OpenPasswordChatList/OpenPasswordChatLists";

const AllChattingPage = (): JSX.Element => {
  const [tabState, setTabState] = useState<"ALL" | "ENTERED" | "DM" | "GROUP">(
    "ALL"
  );
  const { inChatInfo, setInChatInfo } = useChat();

  useEffect(() => {
    setInChatInfo({ ...inChatInfo, inChat: 0 });
  }, []);

  return (
    <Container>
      <section className="h-full w-full">
        <div id="chatUserListModal" />
        {inChatInfo.inChat ? (
          <InChatting />
        ) : (
          <>
            <ChattingListHeader />
            <nav>
              <ul className="flex w-full justify-between px-4 text-base font-bold md:text-[20px]">
                <ChattingNaviList
                  tabState={tabState}
                  setTabState={setTabState}
                  tabName="전체 오픈 채팅방"
                  tabTitle="ALL"
                />
                <ChattingNaviList
                  tabState={tabState}
                  setTabState={setTabState}
                  tabName="참여중인 오픈 채팅방"
                  tabTitle="ENTERED"
                />
              </ul>
            </nav>
            <OpenPasswordChatLists tabState={tabState} />
          </>
        )}
      </section>
    </Container>
  );
};

export default AllChattingPage;
