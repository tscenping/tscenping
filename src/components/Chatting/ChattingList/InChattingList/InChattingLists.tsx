import InChattingList from "./InChattingList";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import InfiniteScroll from "react-infinite-scroll-component";

interface InChattingListsProps {
  tabState: string;
}

interface ChatData {
  name: string;
  channelType: string;
  channelId: number;
}

const InChattingLists = (props: InChattingListsProps): JSX.Element => {
  const instance = useAxios();

  const fetchUrl = async (url: string) => {
    const response = await instance.get(url);
    return response.data;
  };

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["group-dm", props.tabState],
    queryFn: async ({ pageParam }) => {
      const urlParam = `/channels/${
        props.tabState === "GROUP" ? "me" : "dm"
      }/?page=${pageParam}`;
      const result = await fetchUrl(urlParam);
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage[props.tabState === "GROUP" ? "channels" : "dmChannels"]
        .length < 10
        ? undefined
        : allPages.length + 1;
    },
  });

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
        {data?.pages.map((el: ChatData) =>
          (props.tabState === "GROUP" && el.channelType === "PRIVATE") ||
          (props.tabState === "ONETOONE" && el.channelType === "DM") ? (
            <InChattingList
              key={el.channelId}
              channelId={el.channelId}
              channelName={el.name}
              channelType={el.channelType}
            />
          ) : null
        )}
      </InfiniteScroll>
    </ul>
  );
};

export default InChattingLists;
