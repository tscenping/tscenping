import blockUsers from "../../img/Friends/blockUsers.svg";
import { FormEvent, useState, useRef } from "react";
import useAxios from "../../hooks/useAxios";
import FriendUser from "./FriendUser";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchUserInput from "./SearchUserInput";
import useGetUsers from "hooks/useApiFunction/useGetUsers";
import { useQuery } from "@tanstack/react-query";
import { UserStatusType } from "types/UserTypes";
import { useMyData } from "store/profile";
import { useModalState, useNoticeModalState } from "store/modal";

interface FriendUserProps {
  id: number;
  nickname: string;
  avatar: string;
  status: UserStatusType;
  isBlocked: boolean;
  isFriend: boolean;
}

interface FriendUsersProps {
  setPageSection: (v: string) => void;
}

const FriendUsers = (props: FriendUsersProps): JSX.Element => {
  const [searchUser, setSearchUser] = useState<FriendUserProps | undefined>();
  const [searchUserInput, setSearchUserInput] = useState<string>("");
  const instance = useAxios();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const { data, fetchNextPage, hasNextPage } = useGetUsers("FRIEND");
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const { setModalName } = useModalState();
  const { setContent } = useNoticeModalState();
  const { myData } = useMyData();

  const searchUserApiHandler = async (url: string) => {
    //자기 자신 검색할 시 처리하는 예외처리
    if (myData.nickname === nicknameRef.current?.value) {
      setModalName("notice");
      setContent("자기자신을 검색할 수 없습니다.");
      nicknameRef.current.value = "";
      setSearchUserInput("");
      return;
    }
    //자기 자신 검색할 시 처리하는 예외처리

    //아무것도 입력안하고 검색했을 시
    if (!nicknameRef.current?.value) {
      return;
    }
    //아무것도 입력안하고 검색했을 시

    try {
      const response = await instance.get(url);
      if (response.status === 200) {
        setSearchUser({
          nickname: response.data.nickname,
          id: response.data.id,
          isBlocked: response.data.isBlocked,
          isFriend: response.data.isFriend,
          status: "",
          avatar: response.data.avatar,
        });
      }
      setIsEnabled(true);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { refetch } = useQuery({
    queryKey: ["search-user"],
    queryFn: () =>
      searchUserApiHandler(
        `/users/profile/${
          !isEnabled ? nicknameRef.current?.value : searchUser?.nickname
        }`
      ),
    enabled: isEnabled,
  });

  return (
    <>
      <section className="p-5 py-7 w-full h-full">
        <form
          className="relative flex flex-col items-center"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            refetch();
          }}
        >
          <SearchUserInput
            nicknameRef={nicknameRef}
            setSearchUserInput={setSearchUserInput}
            searchUserInput={searchUserInput}
            searchUser={searchUser}
            setSearchUser={setSearchUser}
            setIsEnabled={setIsEnabled}
          />
        </form>
        <section className="flex flex-col h-full ">
          <section className="flex justify-between pt-3 pb-2 items-center">
            <strong className="md:text-2xl text-base">
              {searchUserInput ? "검색한 유저" : "전체친구"}
            </strong>
            <section className="cursor-pointer">
              <strong
                className="flex  md:text-xl text-sm text-[#939393]"
                onClick={() => {
                  props.setPageSection("block");
                }}
              >
                <img
                  src={blockUsers}
                  className="mr-[8px] w-[12px] md:w-[20px]"
                  alt="block users icon"
                />
                차단친구
              </strong>
            </section>
          </section>
          <section className="h-full ">
            <ul
              className="flex flex-col w-full mt-4 overflow-y-auto h-5/6 scrollbar-hide"
              id="frinedList"
            >
              {searchUser && (
                <FriendUser
                  nickname={searchUser.nickname}
                  avatar={searchUser.avatar}
                  id={searchUser.id}
                  status={searchUser.status}
                  isFriend={searchUser.isFriend}
                  isBlocked={searchUser.isBlocked}
                />
              )}
              {!searchUser && !searchUserInput && (
                <InfiniteScroll
                  next={fetchNextPage}
                  hasMore={hasNextPage}
                  dataLength={
                    data?.pages.reduce(
                      (total, page) => total + page.friends.length,
                      0
                    ) || 0
                  }
                  loader={<></>}
                  scrollableTarget="friendList"
                  style={{ overflow: "visible" }}
                >
                  {data?.pages.map((page) =>
                    page.friends?.map((el: FriendUserProps) => (
                      <FriendUser
                        key={el.id}
                        nickname={el.nickname}
                        avatar={el.avatar}
                        id={el.id}
                        status={el.status}
                        isFriend={true}
                        isBlocked={false}
                      />
                    ))
                  )}
                </InfiniteScroll>
              )}
            </ul>
          </section>
        </section>
      </section>
    </>
  );
};

export default FriendUsers;
