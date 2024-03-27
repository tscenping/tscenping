import { useNavigate } from "react-router-dom";
import Container from "../components/Util/Container";
import defaultImageRouneded from "../img/Login/defaultImageRounded.svg";
import axios from "axios";

const defaultImage = process.env.REACT_APP_DEFAULT_PROFILE;

const UserInfoPage = (): JSX.Element => {
  const navigate = useNavigate();
  const userinfoHandler = async () => {
    const data = { nickname: "sangyeki", avatar: String(defaultImage) };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.patch(
        "https://localhost:3000/auth/signup",
        JSON.stringify(data),
        config
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error occurred during login authentication:", error);
    }
  };

  return (
    <Container>
      <section className="h-screen flex flex-col justify-between ">
        <section>
          <header className="w-full pt-10 flex justify-center text-[18px] font-bold md:text-[24px]">
            <h1>프로필 설정</h1>
          </header>
          <section className="px-5 mt-40 md:mt-48">
            <section className="text-[18px] font-bold md:text-[24px]">
              <span>만나서 반가워요!</span>
              <section className="mt-2">
                게임에 사용할 프로필을 설정해주세요.
              </section>
            </section>
            <section className="flex flex-col items-center justify-center w-full mt-16">
              <section className="rounded-[30px] mb-5 flex flex-col items-center">
                <img
                  src={defaultImageRouneded}
                  alt="default profile"
                  className="w-[69px] mb-2 md:w-[88px]"
                />
                <strong className="text-customGreen">
                  사진은 1장, JPEG, PNG, SVG파일만 가능해요
                </strong>
              </section>
              <section className="w-full relative flex items-center">
                <input
                  type="text"
                  className="w-full p-3 rounded-[20px] bg-[#2d2d2d] border-[1px] border-solid border-white outline-none"
                />
                <span className="absolute right-5 text-[#b3b3b3]">0/10</span>
              </section>
            </section>
          </section>
        </section>
        <button className="pb-10" onClick={userinfoHandler}>
          다음
        </button>
      </section>
    </Container>
  );
};

export default UserInfoPage;
