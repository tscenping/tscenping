interface RankingUserList {
  nickname: string;
  avatar: string;
  ladderScore: number;
  ranking: number;
}

export default function RankingContentItem(props: RankingUserList) {
  return (
    <li className="flex items-center justify-start w-full gap-3 bg-#3F3F3F h-full pt-3 pb-3 relative mt-3">
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
