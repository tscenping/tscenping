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
      await instance.get(`users/me`).then((res) => {
        setMyData(res.data);
        if (res.data.nickname === "" || res.data.nickname === null) {
          navigate("/login/userinfo");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (pathName === "login") {
      return ;
    }
    else if (pathName === "logincallback" || pathName === "googlecallback") {
      return;
    }
    else if (pathName === "userinfo" && cookies.get("accessToken")) {
      if (myData?.nickname === null || myData?.nickname === "") return;
      else navigate("/");
    }
    else if (!cookies.get("accessToken")) {
      console.log(cookies.get("accessToken"), "쿠키 없음")
      navigate("/login");
    }
    else if (myData?.nickname === "" || myData?.nickname === null ) {
      console.log(myData, "myDataNickname 없음")
      console.log("getMyData");
      console.log(pathName);
      getMyData();
      return;
    }

    // 1. 액세스 토큰 없음
    // 2. 액세스 토큰 유효하지 않음
    // 3. 액세스 토큰 유효하지만, 정보가 없음
    // 4. 액세스 토큰 유효하고 정보가 있음
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, myData]);

  return <></>;
};

export default LoginCheck;
