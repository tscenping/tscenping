import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import Container from "../components/Util/Container";
import axios from "axios";
import Loading from "../img/Login/Loading.svg";
import { useModalState, useNoticeModalState } from "../store/modal";

const LoginCallbackPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { setModalName } = useModalState();
  const { setContent } = useNoticeModalState();

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
          if (response.data.isFirstLogin) navigate("/login/userinfo");
          if (!response.data.isFirstLogin) navigate("/");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/login");
          setModalName("notice");
          setContent("로그인을 다시 시도해주세요.");
        }
      }
    };

    loginAuthHandler();
  }, []);

  return (
    <Container>
      <section className="flex items-center w-full flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <strong>42서울 계정으로 로그인 중이에요</strong>
        <img src={Loading} alt="loading" className="w-20" />
      </section>
    </Container>
  );
};

export default LoginCallbackPage;
