import blockUsers from "../../img/Friends/blockUsers.svg";
import { FormEvent, useState, useRef } from "react";
import useAxios from "../../hooks/useAxios";
import FriendUser from "./FriendUser";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchUserInput from "./SearchUserInput";
import useGetUsers from "hooks/useApiFunction/useGetUsers";
import { useMyData } from "store/profile";
import { useModalState, useNoticeModalState } from "store/modal";
import { FriendUserInfoType } from "types/FriendTypes";
import { useSearchUser } from "store/friend";

interface FriendUsersProps {
  setPageSection: (v: string) => void;
}

const FriendUsers = (props: FriendUsersProps): JSX.Element => {
  // const [searchUser, setSearchUser] = useState<
  //   FriendUserInfoType | undefined
  // >();
  const { searchUser, setSearchUser } = useSearchUser();
  const [searchUserInput, setSearchUserInput] = useState<string>("");
  const instance = useAxios();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const { data, fetchNextPage, hasNextPage } = useGetUsers("FRIEND");
  const { setModalName } = useModalState();
  const { setContent } = useNoticeModalState();
  const { myData } = useMyData();

  const searchUserApiHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //자기 자신 검색할 시 처리하는 예외처리
    if (nicknameRef.current && myData.nickname === nicknameRef.current?.value) {
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
      const response = await instance.get(
        `/users/profile/${nicknameRef.current.value}`
      );
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="w-full h-full p-5 py-7">
        <form
          className="relative flex flex-col items-center"
          onSubmit={searchUserApiHandler}
        >
          <SearchUserInput
            nicknameRef={nicknameRef}
            setSearchUserInput={setSearchUserInput}
            searchUserInput={searchUserInput}
            searchUser={searchUser}
            setSearchUser={setSearchUser}
          />
        </form>
        <section className="flex flex-col h-full ">
          <section className="flex items-center justify-between pt-3 pb-2">
            <strong className="text-base md:text-2xl">
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
              {searchUser && searchUserInput && (
                <FriendUser
                  nickname={searchUser.nickname}
                  avatar={searchUser.avatar}
                  id={searchUser.id}
                  status={searchUser.status}
                  isFriend={searchUser.isFriend}
                  isBlocked={searchUser.isBlocked}
                />
              )}
              {!searchUserInput && (
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
                    page.friends.map((el: FriendUserInfoType) => (
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
