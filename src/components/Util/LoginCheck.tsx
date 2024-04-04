import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";

const LoginCheck = (): JSX.Element => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const location = useLocation();
  const pathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    if (!cookies.get("accessToken") && pathName !== "logincallback")
      navigate("/login");
  }, [navigate]);

  return <></>;
};

export default LoginCheck;
