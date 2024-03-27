import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Util/Container";
import axios from "axios";
import Loading from "../img/Login/Loading.svg";

const LoginCallbackPage = (): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeValue = { code: urlParams.get("code") };

    const loginAuthHandler = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };

        const response = await axios.post(
          "https://localhost:3000/auth/signin",
          JSON.stringify(codeValue),
          config
        );
        if (response.status === 201) {
          if (response.data.isFirstLogin) {
            navigate("/login/userinfo");
          }
          if (!response.data.isFirstLogin) {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error occurred during login authentication:", error);
      }
    };

    loginAuthHandler();
  }, []);

  return (
    <Container>
      <section className="flex items-center w-full flex-col">
        <strong>42서울 계정으로 로그인 중이에요</strong>
        <img src={Loading} alt="loading" className="w-20" />
      </section>
    </Container>
  );
};

export default LoginCallbackPage;
