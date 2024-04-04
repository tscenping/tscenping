import { useState } from "react";
import Container from "../components/Util/Container";
import ChattingListHeader from "../components/Chatting/ChattingListHeader";
import InChattingNaviList from "../components/Chatting/ChattingNaviList";
import InChattingLists from "../components/Chatting/InChatting/InChattingLists";

const InChattingPage = (): JSX.Element => {
  const [tabState, setTabState] = useState("GROUP");

  return (
    <Container>
      <ChattingListHeader />
      <nav>
        <ul className="flex justify-around px-10 text-[16px] font-bold md:text-[20px]">
          <InChattingNaviList
            tabState={tabState}
            setTabState={setTabState}
            tabName="참여중인 그룹 채팅"
            tabTitle="GROUP"
          />
          <InChattingNaviList
            tabState={tabState}
            setTabState={setTabState}
            tabName="참여중인 1:1 채팅"
            tabTitle="ONETOONE"
          />
        </ul>
      </nav>
      <section className="px-3 py-3 max-h-[852px]">
        <InChattingLists tabState={tabState} />
      </section>
    </Container>
  );
};

export default InChattingPage;
