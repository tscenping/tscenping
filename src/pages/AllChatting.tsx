import { useState, useEffect } from "react";
import Container from "../components/Util/Container";
import ChattingListHeader from "../components/Chatting/ChattingList/ChattingListHeader";
import InChattingNaviList from "../components/Chatting/ChattingList/ChattingNaviList";
import AllChattingLists from "../components/Chatting/ChattingList/AllChattingList/AllChattingLists";
import InChatting from "../components/Chatting/ChattingList/InChatting/InChatting";
import { useChat } from "../store/chat";

const AllChattingPage = (): JSX.Element => {
  const [tabState, setTabState] = useState("ALL");
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
                <InChattingNaviList
                  tabState={tabState}
                  setTabState={setTabState}
                  tabName="전체 오픈 채팅방"
                  tabTitle="ALL"
                />
                <InChattingNaviList
                  tabState={tabState}
                  setTabState={setTabState}
                  tabName="참여중인 오픈 채팅방"
                  tabTitle="PARTICIPATED"
                />
              </ul>
            </nav>
            <AllChattingLists tabState={tabState} />
          </>
        )}
      </section>
    </Container>
  );
};

export default AllChattingPage;
