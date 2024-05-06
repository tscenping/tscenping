import React, { useEffect } from "react";
import OpenPasswordChatList from "./OpenPasswordChatList";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatData, ChatTabStateType } from "types/ChatTypes";
import useGetChatLists from "hooks/useApiFunction/useGetChatLists";

interface AllChattingListsProps {
  tabState: ChatTabStateType;
}

const OpenPasswordChatLists = (props: AllChattingListsProps): JSX.Element => {
  const { data, hasNextPage, fetchNextPage } = useGetChatLists(props.tabState);

  useEffect(() => {
    if (props.tabState === "ENTERED" && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage]);

  return (
    <ul
      className="flex flex-col px-3 py-3 overflow-y-scroll h-5/6 scrollbar-hide"
      id="ul"
    >
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage}
        dataLength={
          data?.pages.reduce(
            (total, page) => total + page.channels.length,
            0
          ) || 0
        }
        loader={<></>}
        scrollableTarget="ul"
        style={{ overflow: "visible" }}
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {props.tabState === "ALL" &&
              page.channels.map((el: ChatData) => {
                return (
                  el.channelType !== "PRIVATE" && (
                    <OpenPasswordChatList
                      key={el.channelId}
                      channelId={el.channelId}
                      channelName={el.name}
                      channelType={el.channelType}
                      userCount={el.userCount}
                      isJoined={el.isJoined}
                    />
                  )
                );
              })}
            {props.tabState === "ENTERED" &&
              page.channels.map((el: ChatData) => {
                return (
                  el.channelType !== "PRIVATE" && (
                    <OpenPasswordChatList
                      key={el.channelId}
                      channelId={el.channelId}
                      channelName={el.name}
                      channelType={el.channelType}
                      userCount={el.userCount}
                      isJoined={el.isJoined}
                    />
                  )
                );
              })}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </ul>
  );
};

export default OpenPasswordChatLists;
