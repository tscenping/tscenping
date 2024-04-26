import { DropDownProps } from "types/DropDownTypes";
import { dropDownStyle } from "../Normal/NormalDropDown";
import useDorpDownIcon from "hooks/useDropDownIcon";
import { useModalState, useNoticeModalState } from "store/modal";
import { useChatSetting } from "store/chat";
import useAxios from "hooks/useAxios";

interface Props {
  props: DropDownProps;
}

export default function Kick({ props }: Props) {
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();
  const { setContent } = useNoticeModalState();

  const instance = useAxios();

  const kickApiHandler = async () => {
    try {
      const response = await instance.patch("/channels/kick", {
        channelUserId: props.channelUserId,
      });
      if (response.status === 200) {
        setContent(`${props.nickname}님을 강제 퇴장 시켰어요.`);
        setModalName("notice");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const kickHandler = () => {
    setChatSetting(
      "",
      `${props.nickname}님을 강제 퇴장 시키겠어요?`,
      "퇴장 시키기",
      kickApiHandler
    );
    setModalName("chatSetting");
  };

  const showKick =
    props.myChannelUserType === "OWNER"
      ? dropDownStyle
      : props.myChannelUserType === "ADMIN" &&
        props.channelUserType === "MEMBER"
      ? dropDownStyle
      : "hidden";

  const KickIcon = useDorpDownIcon({ types: "KICK" });
  return (
    <li className={showKick} onClick={kickHandler}>
      {KickIcon} 강퇴하기
    </li>
  );
}
