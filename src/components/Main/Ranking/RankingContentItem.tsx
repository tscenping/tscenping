import { useEffect } from "react";
import { useModalState } from "../../../store/modal";

interface RankingUserList {
  nickname: string;
  avatar: string;
  ladderScore: number;
  ranking: number;
}

export default function RankingContentItem(props: RankingUserList) {
  const { setModalName, setModalProps } = useModalState();

  return (
    <li
      className="flex items-center justify-start w-full gap-2 bg-#3F3F3F h-full pt-2 pb-2 relative mt-3 cursor-pointer"
      onClick={() => {
        setModalProps({ nickname: props.nickname });
        setModalName("profile");
      }}
    >
      <div className="absolute w-full h-full bg-white border-2 opacity-10 rounded-xl hover:border-amber-100" />
      <div
        className={`font-bold ml-4 min-w-3 ${
          props.ranking <= 3 ? "text-customGreen" : ""
        }`}
      >
        {props.ranking}
      </div>
      <div className="ml-1">{props.nickname}</div>
    </li>
  );
}
