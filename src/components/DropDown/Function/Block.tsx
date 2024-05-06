import useDorpDownIcon from "../../../hooks/useDropDownIcon";
import useAxios from "../../../hooks/useAxios";
import { useModalState } from "../../../store/modal";
import { useChatSetting } from "../../../store/chat";
import { DropDownProps } from "../../../types/DropDownTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dropDownStyle } from "../Normal/NormalDropDown";
import { useChat } from "store/chat";
import { useSearchUser } from "store/friend";
import { useBlocks } from "store/friend";

interface Props {
  props: DropDownProps;
}

export default function Block({ props }: Props) {
  const addBlockIcon = useDorpDownIcon({ types: "A_BLOCK" });
  const deleteBlockIcon = useDorpDownIcon({ types: "D_BLOCK" });
  const blockString = props.isBlocked ? "차단 해제" : "차단 하기";
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();
  const instance = useAxios();
  const queryClient = useQueryClient();
  const { setInChatInfo, inChatInfo } = useChat();
  const { setEditUserRelation } = useSearchUser();
  const { setBlockUsers } = useBlocks();

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

  const blockApiHandler = async () => {
    if (props.isBlocked) {
      try {
        const response = await instance.delete("/users/blocks", {
          data: {
            blockId: props.id,
          },
        });
        if (response.status === 200) {
          const blocksUserResponse = await instance.get("/users/blocks");
          if (blocksUserResponse.status === 200)
            setBlockUsers(blocksUserResponse.data.blocks);
          if (inChatInfo.chatUsers) editChatUserInfo(false);
          setEditUserRelation("DELETEBLOCK");
          setModalName(null);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await instance.post("/users/blocks", {
          blockId: props.id,
        });
        if (response.status === 201) {
          const blocksUserResponse = await instance.get("/users/blocks");
          if (blocksUserResponse.status === 200)
            setBlockUsers(blocksUserResponse.data.blocks);
          if (inChatInfo.chatUsers) editChatUserInfo(true);
          setEditUserRelation("ADDBLOCK");
          setModalName(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
    props.setDropDownType!("NONE");
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
    <li
      className={dropDownStyle}
      onClick={() => {
        setModalName("chatSetting");
        props.setDropDownType!("NONE");
        setChatSetting(
          "",
          `${props.nickname}님을 ${
            props.isBlocked ? "차단해제" : "차단"
          } 하시겠습니까?`,
          `${props.isBlocked ? "해제하기" : "차단하기"}`,
          mutate
        );
      }}
    >
      {blockString === "차단 하기" ? addBlockIcon : deleteBlockIcon}
      {blockString}
    </li>
  );
}
