import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Container from "../components/Util/Container";
import LoginUserInfo from "../components/Login/LoginUserInfo/LoginUserInfo";

const UserInfoPage = (): JSX.Element => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  // 로그인 유무 테스트 코드
  useEffect(() => {
    if (!cookies.get("accessToken")) navigate("/login");
  }, []);
  // 로그인 유무 테스트 코드
  return (
    <Container>
      <LoginUserInfo />
    </Container>
  );
};

export default UserInfoPage;
