import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { instance } from "./axios";
import { useMyData } from "../../store/profile";

const LoginCheck = (): JSX.Element => {
  const { myData, setMyData } = useMyData();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const location = useLocation();
  const pathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const getMyData = async () => {
    try {
      const response = await instance.get(`users/me`);
      setMyData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (
      pathName === "logincallback" ||
      pathName === "googlecallback" ||
      pathName === "login" ||
      pathName === "userinfo"
    )
      return;
    if (!cookies.get("accessToken")) {
      navigate("/login");
    } else if (myData?.nickname === "" || myData?.nickname === null) {
      getMyData();
      return;
    }

    // 1. 액세스 토큰 없음
    // 2. 액세스 토큰 유효하지 않음
    // 3. 액세스 토큰 유효하지만, 정보가 없음
    // 4. 액세스 토큰 유효하고 정보가 있음
  }, [navigate, myData]);

  return <></>;
};

export default LoginCheck;
