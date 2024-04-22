import { useInfiniteQuery } from "@tanstack/react-query";
import useAxios from "hooks/useAxios";
import { ChatTabStateType } from "types/ChatTypes";

const useGetChatLists = (tabState: ChatTabStateType) => {
  const instance = useAxios();

  const fetchUrl = async (url: string) => {
    const response = await instance.get(url);
    return response.data;
  };

  const urlTabState = (() => {
    switch (tabState) {
      case "ALL":
        return "all";
      case "DM":
        return "dm";
      case "ENTERED":
        return "me";
      case "GROUP":
        return "me";
      default:
        return "";
    }
  })();

  const queryKey = (() => {
    switch (tabState) {
      case "ALL":
      case "ENTERED":
        return "open-password";
      case "DM":
      case "GROUP":
        return "group-dm";
    }
  })();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [queryKey, tabState],
    queryFn: async ({ pageParam }) => {
      const result = await fetchUrl(
        `/channels/${urlTabState}/?page=${pageParam}`
      );
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const channels =
        tabState === "DM" ? lastPage.dmChannels : lastPage.channels;
      return channels.length < 10 ? undefined : allPages.length + 1;
    },
  });

  return { data, hasNextPage, fetchNextPage };
};

export default useGetChatLists;
