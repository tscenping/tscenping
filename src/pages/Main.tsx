import { Link } from 'react-router-dom';
import Container from '../components/Util/Container';
import MatchBtn from '../components/Main/Game/MatchBtn';
import Ranking from '../components/Main/Ranking/Ranking';

export default function Main() {
  return (
    <Container>
      <MatchBtn />
      <Ranking />
      <Link to={'/login'}> 로그인 </Link>
    </Container>
  );
}
