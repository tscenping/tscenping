import { MatchDataType } from "types/GameTypes";
import profileImg from "../../img/Main/DefaultPorfileImg.svg";
import { useMyData } from "store/profile";

export default function Player({ props }: { props?: MatchDataType }) {
  const { myData } = useMyData();
  return (
    <div className="flex items-center justify-between object-cover mb-3 rounded-full">
      <img src={myData.avatar} alt="프로필임미지" className="w-1/6" />
      <p>{myData.nickname}</p>
      <p>VS</p>
      <p>{props?.rivalNickname}</p>
      <img src={props?.rivalAvatar} alt="프로필임미지" className="w-1/6" />
    </div>
  );
}
