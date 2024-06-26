import useDorpDownIcon from "hooks/useDropDownIcon";
import { useModalState } from "store/modal";
import { useChatSetting } from "store/chat";
import useAxios from "hooks/useAxios";
import { DropDownProps } from "types/DropDownTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dropDownStyle } from "../Normal/NormalDropDown";
import { useSearchUser } from "store/friend";
import { useChat } from "store/chat";

interface Props {
  props: DropDownProps;
}

export default function Friend({ props }: Props) {
  const instance = useAxios();
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();
  const { setEditUserRelation } = useSearchUser();
  const addFriendIcon = useDorpDownIcon({ types: "A_FRIEND" });
  const deleteFriendIcon = useDorpDownIcon({ types: "D_FRIEND" });
  const { inChatInfo, setInChatInfo } = useChat();

  const friendString = props.isBlocked
    ? "친구 추가"
    : props.isFriend
    ? "친구 삭제"
    : "친구 추가";

  const queryClient = useQueryClient();

  const editChatUserInfo = (v: boolean) => {
    const editChatUsersInfo = inChatInfo.chatUsers.map((el) => {
      if (el.nickname === props.nickname) {
        return { ...el, isBlocked: v };
      } else {
        return el;
      }
    });
    setInChatInfo({ ...inChatInfo, chatUsers: editChatUsersInfo });
  };

  const friendApiHandler = async () => {
    if (props.isFriend) {
      try {
        const response = await instance.delete("/users/friends", {
          data: {
            friendId: props.id,
          },
        });
        if (response.status === 200) {
          setEditUserRelation("DELELEFRIEND");
          setModalName(null);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await instance.post("/users/friends", {
          friendId: props.id,
        });
        if (response.status === 201) {
          if (inChatInfo.chatUsers) editChatUserInfo(false);
          setEditUserRelation("ADDFRIEND");
          setModalName(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
    props.setDropDownType!("NONE");
  };

  const { mutate } = useMutation({
    mutationFn: friendApiHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friend-users"] });
    },
  });

  return (
    <li
      className={dropDownStyle}
      onClick={() => {
        setModalName("chatSetting");
        props.setDropDownType!("NONE");
        setChatSetting(
          "",
          `${props.nickname}님을 ${
            props.isFriend ? "친구삭제" : "친구추가"
          } 하시겠습니까?`,
          `${props.isFriend ? "삭제하기" : "추가하기"}`,
          mutate
        );
      }}
    >
      {friendString === "친구 추가" ? addFriendIcon : deleteFriendIcon}
      {friendString}
    </li>
  );
}
