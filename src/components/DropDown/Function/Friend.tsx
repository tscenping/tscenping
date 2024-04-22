import useDorpDownIcon from "hooks/useDropDownIcon";
import { useModalState } from "store/modal";
import { useChatSetting } from "store/chat";
import useAxios from "hooks/useAxios";
import { DropDownTypes } from "types/DropDownTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FriendProps {
  isFriend?: boolean;
  isBlocked?: boolean;
  nickname?: string;
  userId?: number;
  setDropDownType?: (v: DropDownTypes) => void;
}

export default function Friend({
  isFriend,
  isBlocked,
  nickname,
  userId,
  setDropDownType,
}: FriendProps) {
  const instance = useAxios();
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();
  const addFriendIcon = useDorpDownIcon({ types: "A_FRIEND" });
  const deleteFriendIcon = useDorpDownIcon({ types: "D_FRIEND" });
  const friendString = isBlocked
    ? "친구 추가"
    : isFriend
    ? "친구 삭제"
    : "친구 추가";

  const queryClient = useQueryClient();

  const friendApiHandler = async () => {
    if (isFriend) {
      try {
        const response = await instance.delete("/users/friends", {
          data: {
            friendId: userId,
          },
        });
        if (response.status === 200) setModalName(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await instance.post("/users/friends", {
          friendId: userId,
        });
        if (response.status === 201) {
          setModalName(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setDropDownType!("NONE");
  };

  const { mutate } = useMutation({
    mutationFn: friendApiHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friend-users"] });
      // queryClient.invalidateQueries({ queryKey: ["search-user"] });
      queryClient.refetchQueries({ queryKey: ["search-user"] });
    },
  });

  return (
    <section
      className="flex w-full justify-between"
      onClick={() => {
        setModalName("chatSetting");
        setChatSetting(
          "",
          `${nickname}님을 ${isFriend ? "친구삭제" : "친구추가"} 하시겠습니까?`,
          `${isFriend ? "삭제하기" : "추가하기"}`,
          mutate
        );
      }}
    >
      {friendString === "친구 추가" ? addFriendIcon : deleteFriendIcon}
      {friendString}
    </section>
  );
}
