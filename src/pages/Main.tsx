import { Link } from "react-router-dom";
import Container from "../components/Util/Container";
import MatchBtn from "../components/Main/Game/MatchBtn";

export default function Main() {
  return (
    <Container>
      <MatchBtn/>
      <Link to={'/login'}> 로그인 </Link>
    </Container>
  );
}