import Container from "../components/Util/Container";
import Title from "../img/Login/Title.svg";

export default function Login(): React.ReactElement {
  return (
    <Container>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <section className="flex flex-col items-center justify-center h-full max-w-2xl min-w-36">
        <div className="max-w-full mb-32 ">
          <img src={Title} className="scale-90"/>
        </div>
        <div className="flex flex-col max-w-full gap-3 min-w-[320px]">
          <button className="px-20 py-3 text-black bg-white border-2 rounded-xl">
            42서울 계정으로 로그인
          </button>
          <button className="px-20 py-3 text-black bg-white border-2 rounded-xl">
            Google 계정으로 로그인
          </button>
        </div>
      </section>
    </Container>
  );
}
