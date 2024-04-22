import useDorpDownIcon from "../../../hooks/useDropDownIcon";
import useAxios from "../../../hooks/useAxios";
import { useModalState } from "../../../store/modal";
import { useChatSetting } from "../../../store/chat";
import { DropDownTypes } from "../../../types/DropDownTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FriendProps {
  isBlocked?: boolean;
  nickname?: string;
  userId?: number;
  setDropDownType?: (v: DropDownTypes) => void;
}

export default function Block({
  isBlocked,
  nickname,
  userId,
  setDropDownType,
}: FriendProps) {
  const addBlockIcon = useDorpDownIcon({ types: "A_BLOCK" });
  const deleteBlockIcon = useDorpDownIcon({ types: "D_BLOCK" });
  const blockString = isBlocked ? "차단 해제" : "차단 하기";
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();
  const instance = useAxios();
  const queryClient = useQueryClient();

  const blockApiHandler = async () => {
    if (isBlocked) {
      try {
        const response = await instance.delete("/users/blocks", {
          data: {
            blockId: userId,
          },
        });
        if (response.status === 200) setModalName(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await instance.post("/users/blocks", {
          blockId: userId,
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
    mutationFn: blockApiHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friend-users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["block-users"],
      });
      queryClient.refetchQueries({ queryKey: ["search-user"] });
    },
  });

  return (
    <section
      className="flex justify-between w-full"
      onClick={() => {
        setModalName("chatSetting");
        setChatSetting(
          "",
          `${nickname}님을 ${isBlocked ? "차단해제" : "차단"} 하시겠습니까?`,
          `${isBlocked ? "해제하기" : "차단하기"}`,
          mutate
        );
      }}
    >
      {blockString === "차단 하기" ? addBlockIcon : deleteBlockIcon}
      {blockString}
    </section>
  );
}
