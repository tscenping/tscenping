import { Link } from 'react-router-dom';
import Container from '../components/Util/Container';

export default function NotFound() {
  return (
    <Container>
      <h1>에러 페이지 입니다.</h1>
      <button className='text-black bg-slate-400'>
      <Link to="/">홈으로 이동</Link>
      </button>
    </Container>
  );
}
