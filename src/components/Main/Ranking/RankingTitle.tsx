import { Link } from "react-router-dom";



export default function RankingTitle() {
  return (
    <div className="w-full min-h-10">
      <Link to={"/rank"} className="flex justify-between w-full font-bold">
        <p>User Ranking</p> <p> {`>`}</p>
      </Link>
    </div>
  );
}
