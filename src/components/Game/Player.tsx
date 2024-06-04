import { MatchDataType } from "types/GameTypes";
import profileImg from "../../img/Main/DefaultPorfileImg.svg";
import { useMyData } from "store/profile";

export default function Player({ props }: { props: MatchDataType }) {
  const { myData } = useMyData();
  return (
    <div className="flex items-center justify-around w-full mb-3">
      <img
        src={myData.avatar ? myData.avatar : profileImg}
        alt="프로필임미지"
        className="object-cover rounded-full w-[10%] h-auto aspect-square"
      />
      <p className="text-left-5 w-[30%] pl-[10px]">{myData.nickname}</p>
      <p className="text-center  w-[20%] ">VS</p>
      <p className="text-right  w-[30%] pr-[10px]">{props?.rivalNickname}</p>
      <img
        src={props?.rivalAvatar ? props.rivalAvatar : profileImg}
        alt="프로필임미지"
        className="object-cover rounded-full w-[10%] h-auto aspect-square"
      />
    </div>
  );
}
