import { Link } from "react-router-dom";

export default function RankingTitle() {
  return (
    <div className="w-full mb-5 min-h-6 subtitle-text">
      <Link to={"/rank"} className="flex justify-between w-full font-bold">
        <p className="font-[League-Spartan] ">User Ranking</p>{" "}
        <p className=""> {`>`}</p>
      </Link>
    </div>
  );
}
