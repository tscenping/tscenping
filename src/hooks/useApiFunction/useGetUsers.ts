import useAxios from "hooks/useAxios";
import { useInfiniteQuery } from "@tanstack/react-query";

type useGetUsersType = "FRIEND" | "BLOCK";

const useGetUsers = (userType: useGetUsersType) => {
  const instance = useAxios();

  const fetchUrl = async (url: string) => {
    const response = await instance.get(url);
    return response.data;
  };

  const getUrl = (() => {
    switch (userType) {
      case "FRIEND":
        return "friends";
      case "BLOCK":
        return "blocks";
    }
  })();

  const queryKey = (() => {
    switch (userType) {
      case "FRIEND":
        return "friend-users";
      case "BLOCK":
        return "block-users";
    }
  })();

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const result = await fetchUrl(`/users/${getUrl}/?page=${pageParam}`);
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage[userType === "FRIEND" ? "friends" : "blocks"].length < 10
        ? undefined
        : allPages.length + 1;
    },
  });

  return { data, hasNextPage, fetchNextPage };
};

export default useGetUsers;
