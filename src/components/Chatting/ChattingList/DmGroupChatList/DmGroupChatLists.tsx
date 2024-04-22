import React from "react";
import DmGroupChatList from "./DmGroupChatList";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetChatLists from "hooks/useApiFunction/useGetChatLists";
import { ChatTabStateType, ChatType } from "types/ChatTypes";

interface InChattingListsProps {
  tabState: ChatTabStateType;
}

interface ChatData {
  name: string;
  channelType: ChatType;
  channelId: number;
  userCount: number;
}

interface DmChatData {
  partnerName: string;
  channelType: ChatType;
  channelId: number;
}

const DmGroupChatLists = (props: InChattingListsProps): JSX.Element => {
  const { data, fetchNextPage, hasNextPage } = useGetChatLists(props.tabState);

  return (
    <ul
      className="px-3 py-3 h-5/6 overflow-y-auto flex flex-col scrollbar-hide"
      id="groupDM"
    >
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage}
        dataLength={
          data?.pages.reduce(
            (total, page) =>
              total +
              page[props.tabState === "GROUP" ? "channels" : "dmChannels"]
                .length,
            0
          ) || 0
        }
        loader={<></>}
        scrollableTarget="groupDM"
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {props.tabState === "GROUP"
              ? page.channels.map(
                  (el: ChatData) =>
                    el.channelType === "PRIVATE" && (
                      <DmGroupChatList
                        key={el.channelId}
                        channelId={el.channelId}
                        channelName={el.name}
                        channelType="PRIVATE"
                      />
                    )
                )
              : page.dmChannels.map((el: DmChatData) => (
                  <DmGroupChatList
                    key={el.channelId}
                    channelId={el.channelId}
                    channelName={el.partnerName}
                    channelType="DM"
                  />
                ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </ul>
  );
};

export default DmGroupChatLists;
