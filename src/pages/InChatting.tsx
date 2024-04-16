import { useState } from "react";
import Container from "../components/Util/Container";
import ChattingListHeader from "../components/Chatting/ChattingList/ChattingListHeader";
import InChattingNaviList from "../components/Chatting/ChattingList/ChattingNaviList";
import InChattingLists from "../components/Chatting/ChattingList/InChattingList/InChattingLists";
import { useModalState } from "../store/modal";
import { useChat } from "../store/chat";
import InChatting from "../components/Chatting/ChattingList/InChatting/InChatting";
import InviteChat from "../components/Chatting/InviteChat";

const InChattingPage = (): JSX.Element => {
  const [tabState, setTabState] = useState("GROUP");
  const { modalName } = useModalState();
  // const { createChat, setCreateChat } = useChat();

  return (
    <Container>
      <section className="h-full w-full">
        <div id="chatUserListModal" />
        {/* <InviteChat /> */}
        {/* <InChatting /> */}
        <ChattingListHeader />
        <nav>
          <ul className="flex justify-around px-4 text-[16px] font-bold md:text-[20px] ">
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
        <InChattingLists tabState={tabState} />
      </section>
    </Container>
  );
};

export default InChattingPage;
