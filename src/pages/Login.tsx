import Container from "../components/Util/Container";
import LoginButton from "../components/Login/LoginButton";
import logo from "../img/Login/Title.svg";

export default function Login(): React.ReactElement {
  return (
    <Container>
      <section className="flex flex-col items-center justify-center h-full max-w-2xl min-w-36">
        <div className="max-w-full mb-[74px] ">
          <img src={logo} className="scale-90" alt="logo" />
        </div>
        <div className="flex flex-col max-w-full gap-3 min-w-[320px]">
          <LoginButton loginTarget="42" />
          <LoginButton loginTarget="Google" />
        </div>
      </section>
    </Container>
  );
}
