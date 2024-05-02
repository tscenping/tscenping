import { useState } from "react";
import search from "img/Friends/searchIcon.svg";
import back from "img/Friends/backUsers.svg";
import { useInviteMode } from "store/chat";
import useGetUsers from "hooks/useApiFunction/useGetUsers";
import InfiniteScroll from "react-infinite-scroll-component";
import UserList from "./UserList";
import useAxios from "hooks/useAxios";
import { useModalState } from "store/modal";
import { useChatSetting, useChat } from "store/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import firebaseSetting from "func/settingFirebase";
import { collection, addDoc } from "firebase/firestore/lite";

interface selectUserInfoTypes {
  nickname?: string;
  userId?: number;
}

interface FriendUserProps {
  nickname: string;
  avatar: string;
  id: number;
  status: "ONLINE" | "OFFLINE" | "";
  isFriend: boolean;
  isBlocked: boolean;
}

const InviteChat = (): JSX.Element => {
  const [selectUserInfo, setSelectUserInfo] = useState<selectUserInfoTypes>({});
  const { data, hasNextPage, fetchNextPage } = useGetUsers("FRIEND");
  const { setMode, mode } = useInviteMode();
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();
  const { setInChatInfo, inChatInfo } = useChat();
  const queryClient = useQueryClient();
  const instance = useAxios();
  const { db } = firebaseSetting();

  const addFireStore = async (channelId: number) => {
    const userCollectionRef = collection(db, "chat");
    await addDoc(userCollectionRef, {
      channelId: channelId,
      userCount: 2,
      messages: [],
    });
  };

  const createOneOnOneApiHandler = async () => {
    try {
      const response = await instance.post("/channels", {
        name: selectUserInfo.nickname,
        channelType: "DM",
        password: null,
        userId: selectUserInfo.userId,
      });
      if (response.status === 201) {
        setInChatInfo({
          ...inChatInfo,
          inChat: response.data.channelId,
          chatTitle: response.data.channelUsers[1].nickname,
          chatUsers: response.data.channelUsers,
          channelType: "DM",
          myChannelUserType: "OWNER",
          chatUsersCount: response.data.channelUsers.length,
        });
        addFireStore(response.data.channelId);
        setMode(false);
        setModalName(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation({
    mutationFn: createOneOnOneApiHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group-dm"] });
    },
  });

  const inviteChatApiHandler = async () => {
    try {
      const response = await instance.post("/channels/invite", {
        channelId: inChatInfo.inChat,
        invitedUserId: selectUserInfo.userId,
      });
      if (response.status === 201) {
        setModalName(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="px-4 py-7">
        <section className="flex items-center justify-between w-full pb-3">
          <img
            src={back}
            alt="back"
            className="w-4"
            onClick={() => {
              setMode(false);
            }}
          />
          <span className="text-base font-[Pretendard-Bold] md:text-[24px]">
            채팅방 초대
          </span>
          <span
            className={`${
              selectUserInfo.nickname
                ? "text-base font-[Pretendard]"
                : "text-base font-[Pretendard] text-[#404040]"
            }`}
            onClick={() => {
              if (
                inChatInfo.channelType === "PRIVATE" &&
                selectUserInfo.nickname
              ) {
                setChatSetting(
                  "",
                  `${selectUserInfo.nickname}님을 채팅방에 초대하시겠어요?`,
                  "초대하기",
                  inviteChatApiHandler
                );
                setModalName("chatSetting");
              } else if (selectUserInfo.nickname) {
                setChatSetting(
                  "",
                  `${selectUserInfo.nickname}님과의 1:1채팅을 생성하시겠어요?`,
                  "생성하기",
                  mutate
                );
                setModalName("chatSetting");
              }
            }}
          >
            완료
          </span>
        </section>
        <section className="relative flex flex-col items-center">
          <section className="flex items-center w-full">
            <input
              type="text"
              className="text-white bg-[#ffffff1a] w-full rounded-[16px] py-3 outline-none focus:placeholder-transparent my-4 pl-10"
              placeholder="닉네임을 입력해주세요"
            />
            <img src={search} alt="search users" className="absolute left-4" />
          </section>
        </section>
        <ul className="mt-5">
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
                <UserList
                  key={el.id}
                  nickname={el.nickname}
                  avatar={el.avatar}
                  id={el.id}
                  status={el.status}
                  isFriend={true}
                  isBlocked={false}
                  selectNickname={selectUserInfo.nickname}
                  selectUserId={selectUserInfo.userId}
                  setSelectNickname={setSelectUserInfo}
                />
              ))
            )}
          </InfiniteScroll>
        </ul>
      </section>
    </>
  );
};

export default InviteChat;
