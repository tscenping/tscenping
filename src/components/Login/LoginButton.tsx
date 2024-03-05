import { Link } from "react-router-dom";

interface LoginButtonProps {
  loginTarget: string;
}

const login42 = process.env.REACT_APP_REDIRECTION_URL_42;
const loginGoogle = process.env.REACT_APP_REDIRECTION_URL_GOOGLE;

const LoginButton = (props: LoginButtonProps): JSX.Element => {
  return (
    <Link
      to={props.loginTarget === "42" ? String(login42) : String(loginGoogle)}
    >
      <button className="px-[90px] py-4 text-black bg-white rounded-[20px] w-full text-[18px]">
        <strong>{props.loginTarget}</strong> 계정으로 로그인
      </button>
    </Link>
  );
};

export default LoginButton;
