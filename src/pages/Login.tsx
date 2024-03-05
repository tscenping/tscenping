import Container from "../components/Util/Container";
import Title from "../../public/img/Login/Title.svg";
import LoginButton from "../components/Login/LoginButton";

export default function Login(): React.ReactElement {
  return (
    <Container>
      <section className="flex flex-col items-center justify-center h-full max-w-2xl min-w-36">
        <div className="max-w-full mb-[74px] ">
          <img src="/img/Login/Title.svg" className="scale-90" />
        </div>
        <div className="flex flex-col max-w-full gap-3 min-w-[320px]">
          <LoginButton loginTarget="42" />
          <LoginButton loginTarget="Google" />
        </div>
      </section>
    </Container>
  );
}
