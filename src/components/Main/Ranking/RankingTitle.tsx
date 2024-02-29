import {Link} from "react-router-dom";

export default function RankingTitle() {
    return (
        <>
            <Link to={'/rank'} className="flex justify-around w-full font-bold"> <p>User Ranking</p>  <p> {`>`}</p></Link>
        </>
    )
}