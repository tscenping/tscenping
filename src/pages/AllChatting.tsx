import { useState } from "react";
import Container from "../components/Util/Container";
import ChattingListHeader from "../components/Chatting/ChattingListHeader";
import InChattingNaviList from "../components/Chatting/ChattingNaviList";
import AllChattingLists from "../components/Chatting/AllChatting/AllChattingLists";

const AllChattingPage = (): JSX.Element => {
  const [tabState, setTabState] = useState("ALL");

  return (
    <Container>
      <ChattingListHeader />
      <nav>
        <ul className="flex justify-around px-10 text-[16px] font-bold md:text-[20px]">
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
      <section className="p-3 max-h-[852px]">
        <AllChattingLists tabState={tabState} />
      </section>
    </Container>
  );
};

export default AllChattingPage;
