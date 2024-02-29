interface RankingUserList {
  nickname: string;
  avatar: string;
  ladderScore: number;
  ranking: number;
}

export default function RankingContentItem(props: RankingUserList) {
  return (
    <>
      {/*{props.avatar}*/}
      <div className="w-full h-full absolute bg-white opacity-10 rounded-xl border-2 hover:border-amber-100" />
      <div
        className={`font-bold ml-4 min-w-3 ${props.ranking <= 3 ? 'text-customGreen' : ''}`}
      >
        {props.ranking}
      </div>
      <div className="ml-1">{props.nickname}</div>
      {/*{props.ladderScore}*/}
    </>
  );
}
