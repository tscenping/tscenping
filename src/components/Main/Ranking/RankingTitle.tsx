import { Link } from "react-router-dom";

export default function RankingTitle() {
  return (
    <div className="w-full min-h-6 mb-5">
      <Link to={"/rank"} className="flex justify-between w-full font-bold">
        <p className="font-[League-Spartan] text-2xl">User Ranking</p>{" "}
        <p className="text-2xl"> {`>`}</p>
      </Link>
    </div>
  );
}
