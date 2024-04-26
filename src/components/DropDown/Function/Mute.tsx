import { DropDownProps } from "types/DropDownTypes";
import { dropDownStyle } from "../Normal/NormalDropDown";
import useDorpDownIcon from "hooks/useDropDownIcon";
import { useModalState, useNoticeModalState } from "store/modal";
import { useChatSetting } from "store/chat";
import useAxios from "hooks/useAxios";

interface Props {
  props: DropDownProps;
}

export default function Mute({ props }: Props) {
  const instance = useAxios();
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();
  const { setContent } = useNoticeModalState();

  const muteApiHandler = async () => {
    try {
      const response = await instance.patch("/channels/mute", {
        channelUserId: props.channelUserId,
      });
      if (response.status === 200) {
        setContent(`${props.nickname}님을 채팅 금지 시켰어요.`);
        setModalName("notice");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const muteHandler = () => {
    setModalName("chatSetting");
    setChatSetting(
      "",
      `${props.nickname}님을 채팅금지 시키시겠어요?`,
      "채팅금지",
      muteApiHandler
    );
  };

  const showMute =
    props.myChannelUserType === "OWNER"
      ? dropDownStyle
      : props.myChannelUserType === "ADMIN" &&
        props.channelUserType === "MEMBER"
      ? dropDownStyle
      : "hidden";

  const MuteIcon = useDorpDownIcon({ types: "MUTE" });
  return (
    <li className={showMute} onClick={muteHandler}>
      {MuteIcon} 채팅금지
    </li>
  );
}
