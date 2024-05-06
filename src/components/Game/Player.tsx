import { MatchDataType } from "types/GameTypes";
import profileImg from "../../img/Main/DefaultPorfileImg.svg";
import { useMyData } from "store/profile";

export default function Player({ props }: { props: MatchDataType }) {
  const { myData } = useMyData();
  return (
    <div className="flex items-center justify-between mb-3 ">
      <img
        src={myData.avatar ? myData.avatar : profileImg}
        alt="프로필임미지"
        className="object-cover rounded-full h-[60px] w-[60px]"
      />
      <p>{myData.nickname}</p>
      <p>VS</p>
      <p>{props?.rivalNickname}</p>
      <img
        src={props?.rivalAvatar ? props.rivalAvatar : profileImg}
        alt="프로필임미지"
        className="object-cover rounded-full h-[60px] w-[60px]"
      />
    </div>
  );
}
