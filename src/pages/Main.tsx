import { Link } from "react-router-dom";
import Container from "../components/Util/Container";
import MatchBtn from "../components/Main/Game/MatchBtn";
import Ranking from "../components/Main/Ranking/Ranking";
import MainProfile from "../components/Main/Profile/Profile";

export default function Main() {
  return (
    <Container>
      <div className="relative flex flex-col justify-around h-full gap-4">
        <MainProfile />
        <MatchBtn />
        <Ranking />
        {/* <Link to={'/login'}> 로그인 </Link> */}
      </div>
    </Container>
  );
}
