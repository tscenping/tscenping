import { useState } from "react";
import Container from "../components/Util/Container";
import ChattingListHeader from "../components/Chatting/ChattingList/ChattingListHeader";
import InChattingNaviList from "../components/Chatting/ChattingList/ChattingNaviList";
import AllChattingLists from "../components/Chatting/ChattingList/AllChattingList/AllChattingLists";

const AllChattingPage = (): JSX.Element => {
  const [tabState, setTabState] = useState("ALL");

  return (
    <Container>
      <section className="h-full w-full">
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
      </section>
    </Container>
  );
};

export default AllChattingPage;
