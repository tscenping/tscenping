import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Util/Container";
import axios from "axios";
import Loading from "../img/Login/Loading.svg";
import { useModalState, useNoticeModalState } from "../store/modal";
import { useMyData } from "store/profile";
import Mfa from "components/Login/Mfa";

const GoogleCallbackPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { setModalName } = useModalState();
  const { setContent } = useNoticeModalState();
  const { setMyData, myData } = useMyData();

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
          "https://localhost:3000/auth/signin-google",
          JSON.stringify(codeValue),
          config
        );
        if (response.status === 201) {
          setMyData({
            nickname: response.data.nickname,
            id: response.data.userId,
            isMfaEnabled: response.data.isMfaEnabled,
            mfaCode: response.data.mfaUrl,
          });
          if (response.data.isFirstLogin) navigate("/login/userinfo");
          if (!response.data.isFirstLogin && !response.data.isMfaEnabled)
            navigate("/");
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
      {myData.isMfaEnabled ? (
        <Mfa />
      ) : (
        <section className="flex items-center w-full flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <strong>Google 계정으로 로그인 중이에요</strong>
          <img src={Loading} alt="loading" className="w-20" />
        </section>
      )}
    </Container>
  );
};

export default GoogleCallbackPage;
