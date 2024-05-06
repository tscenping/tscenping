import { useState, useEffect } from "react";
import Container from "../components/Util/Container";
import ChattingListHeader from "../components/Chatting/ChattingList/ChattingListHeader";
import InChattingNaviList from "../components/Chatting/ChattingList/ChattingNaviList";
import { useChat } from "../store/chat";
import ChatLog from "../components/Chatting/InChat/ChatLog";
import InviteChat from "../components/Chatting/InviteChat/InviteChat";
import { useInviteMode } from "../store/chat";
import DmGroupChatLists from "components/Chatting/ChattingList/DmGroupChatList/DmGroupChatLists";
import { ChatTabStateType } from "types/ChatTypes";

const InChattingPage = (): JSX.Element => {
  const [tabState, setTabState] = useState<ChatTabStateType>("GROUP");
  const { mode } = useInviteMode();
  const { inChatInfo, setInChatInfo } = useChat();

  useEffect(() => {
    setInChatInfo({ ...inChatInfo, inChat: 0 });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <section className="w-full h-full">
        <div id="chatUserListModal" />
        {mode ? (
          <InviteChat />
        ) : !inChatInfo.inChat ? (
          <>
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
                  tabTitle="DM"
                />
              </ul>
            </nav>
            <DmGroupChatLists tabState={tabState} />
          </>
        ) : (
          <ChatLog />
        )}
      </section>
    </Container>
  );
};

export default InChattingPage;
