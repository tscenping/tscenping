import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import AllChattingList from "./AllChattingList";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxios from "../../../../hooks/useAxios";

interface AllChattingListsProps {
  tabState: string;
}

interface ChatData {
  name: string;
  channelType: string;
  channelId: number;
  isJoined: boolean;
  userCount: number;
}

const AllChattingLists = (props: AllChattingListsProps): JSX.Element => {
  const instance = useAxios();

  const fetchUrl = async (url: string) => {
    const response = await instance.get(url);
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["open-password", props.tabState],
    queryFn: async ({ pageParam }) => {
      const result = await fetchUrl(
        `/channels/${
          props.tabState === "ALL" ? "all" : "me"
        }/?page=${pageParam}`
      );
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.channels.length < 10 ? undefined : allPages.length + 1;
    },
  });

  return (
    <ul
      className="px-3 py-3 h-5/6 overflow-y-auto flex flex-col scrollbar-hide"
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
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {props.tabState === "ALL" &&
              page.channels.map((el: ChatData) => (
                <AllChattingList
                  key={el.channelId}
                  channelId={el.channelId}
                  channelName={el.name}
                  channelType={el.channelType}
                  userCount={el.userCount}
                  isJoined={el.isJoined}
                />
              ))}
            {props.tabState === "PARTICIPATED" &&
              page.channels.map((el: ChatData) => (
                <AllChattingList
                  key={el.channelId}
                  channelId={el.channelId}
                  channelName={el.name}
                  channelType={el.channelType}
                  userCount={el.userCount}
                  isJoined={el.isJoined}
                />
              ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </ul>
  );
};

export default AllChattingLists;
