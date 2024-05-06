import { DropDownProps } from "types/DropDownTypes";
import { dropDownStyle } from "../Normal/NormalDropDown";
import useDorpDownIcon from "hooks/useDropDownIcon";

interface Props {
  props: DropDownProps;
}
export default function Profile({ props }: Props) {
  const ProfileIcon = useDorpDownIcon({ types: "PROFILE" });
  return <li className={dropDownStyle}>{ProfileIcon} 프로필보기</li>;
}
