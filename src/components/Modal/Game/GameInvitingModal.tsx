import ModalHeader from "../ModalHeader";
import useGetUsers from "hooks/useApiFunction/useGetUsers";
import InfiniteScroll from "react-infinite-scroll-component";
import SpecialCheck from "../../../img/Main/SpecialCheck.svg";
import SpecialUncheck from "../../../img/Main/SpecialUncheck.svg";
import { useState } from "react";
import GameInviteUserList from "components/Game/GameInviteUserList";
import { useModalState } from "store/modal";
import useAxios from "hooks/useAxios";
import { useGameInviteState } from "store/game";

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

export default function GameInvitingModal() {
  const { data, hasNextPage, fetchNextPage } = useGetUsers("FRIEND");
  const [selectUserInfo, setSelectUserInfo] =
    useState<selectUserInfoTypes | null>(null);
  const [isSpecial, setIsSpecial] = useState<boolean>(false);
  const { setModalName } = useModalState();
  const { setGameInviteState } = useGameInviteState();
  const instance = useAxios();
  const changeSpecial = () => {
    setIsSpecial((prev) => !prev);
  };

  const acceptHandler = async () => {
    try {
      await instance
        .post("/game/invite", {
          invitedUserId: selectUserInfo?.userId,
          gameType: isSpecial ? "SPECIAL_INVITE" : "NORMAL_INVITE",
        })
        .then((res) => {
          setGameInviteState({ invitationId: res.data.gameInvitationId });
          setModalName("waitInvite");
          console.log(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <ModalHeader title="게임에 초대할 친구를 선택해주세요." />
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
              <GameInviteUserList
                key={el.id}
                nickname={el.nickname}
                avatar={el.avatar}
                id={el.id}
                status={el.status}
                isFriend={true}
                isBlocked={false}
                selectNickname={selectUserInfo?.nickname}
                selectUserId={selectUserInfo?.userId}
                setSelectNickname={setSelectUserInfo}
              />
            ))
          )}
        </InfiniteScroll>
      </ul>
      <label
        htmlFor="SpecialMode"
        className={`flex gap-3 hover:scale-130 cursor-pointer min-h-5 items-center justify-center transition-all duration-300 ease-in-out opacity-100 `}
      >
        <input
          type={"checkbox"}
          id="SpecialMode"
          className={`hidden`}
          checked={isSpecial}
          onChange={changeSpecial}
        />
        <img
          src={isSpecial ? SpecialCheck : SpecialUncheck}
          className="scale-110 cursor-pointer "
          alt={"체크박스"}
        />
        Special Mode
      </label>
      <button
        onClick={() => {
          selectUserInfo && acceptHandler();
        }}
        className={`w-full py-2 text-[#404040] ${
          selectUserInfo ? "bg-[#6DFCAF]" : "bg-[#ffffff]"
        } rounded-full mt-3`}
      >
        초대하기
      </button>
    </>
  );
}
