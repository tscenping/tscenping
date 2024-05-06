
interface ProfileMatchDataProps {
  ladderRank?: number;
  ladderScore?: number;
  ladderMaxScore?: number;
  totalCount?: number;
  winCount?: number;
  loseCount?: number;
}

export default function ProfileMatchData(props: ProfileMatchDataProps) {
  return (
    <section>
      <ul className="flex flex-col gap-4">
        <li className="flex justify-between">
          <p className="text-[#A9A9A9] ">랭킹</p>
          <p>{props.ladderRank} 등</p>
        </li>
        <li className="flex justify-between">
          <p className="text-[#A9A9A9] ">래더점수</p>
          <p>{props.ladderScore} 점</p>
        </li>
        <li className="flex justify-between">
          <p className="text-[#A9A9A9] ">최고점수</p>
          <p>{props.ladderMaxScore} 점</p>
        </li>
        <li className="flex justify-between">
          <p className="text-[#A9A9A9] ">통계</p>
          <p>
            {props.totalCount} 전 {props.winCount} 승{" "}
            {props.loseCount} 패
          </p>
        </li>
      </ul>
    </section>
  );
}
