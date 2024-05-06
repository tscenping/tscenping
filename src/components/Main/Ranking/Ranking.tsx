import RankingTitle from "./RankingTitle";
import RankingList from "./RankingList";

export default function Ranking() {
  return (
    <div className="w-full flex-1 h-1/2 max-w-[720px] min-w-[240px] flex flex-col justify-center ">
      <RankingTitle />
      <RankingList />
    </div>
  );
}
