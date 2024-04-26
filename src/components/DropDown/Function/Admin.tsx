import { DropDownProps } from "types/DropDownTypes";
import { dropDownStyle } from "../Normal/NormalDropDown";
import useDorpDownIcon from "hooks/useDropDownIcon";
import { useModalState } from "store/modal";
import { useChat, useChatSetting } from "store/chat";
import useAxios from "hooks/useAxios";

interface Props {
  props: DropDownProps;
}

export default function Admin({ props }: Props) {
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();

  const instance = useAxios();

  const adminApiHandler = async () => {
    try {
      const response = await instance.patch("/channels/admin", {
        channelUserId: props.channelUserId,
      });
      if (response.status === 200) {
        setModalName("chatUserList");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const adminHandler = () => {
    setChatSetting(
      "",
      `${props.nickname}님을 관리자${
        props.channelUserType === "ADMIN"
          ? "에서 해제하시겠어요?"
          : "로 임명하시겠어요?"
      }`,
      `${props.channelUserType === "ADMIN" ? "해제하기" : "임명하기"}`,
      adminApiHandler
    );
    setModalName("chatSetting");
  };

  const AddAdminIcon = useDorpDownIcon({ types: "A_ADMIN" });
  const DeleteAdminIcon = useDorpDownIcon({ types: "D_ADMIN" });

  console.log(props);
  return (
    <li
      className={`${dropDownStyle} ${
        props.myChannelUserType !== "OWNER" ? "hidden" : ""
      }`}
      onClick={adminHandler}
    >
      {props.channelUserType !== "ADMIN" ? AddAdminIcon : DeleteAdminIcon}
      {props.channelUserType !== "ADMIN" ? " 관리자 임명" : " 관리자 해제"}
    </li>
  );
}
