import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NickNameInput from "./NicknameInput";
import ProfileImageInput from "./ProfileImageInput";
import useAxios from "../../../hooks/useAxios";
import useImage from "../../../hooks/useImage";

const defaultImage = process.env.REACT_APP_DEFAULT_PROFILE;

const LoginUserInfo = (): JSX.Element => {
  const instance = useAxios();
  const [uploadImage, setUploadImage] = useState<File>();
  const navigate = useNavigate();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const { handleUploadImage, imageUrl } = useImage();

  const [presignedUrl, setPreSignedUrl] = useState<string>("");
  const [s3Url, setS3Url] = useState<string>("");
  const getPresignedUrl = async () => {
    try {
      await instance.get("/users/s3image").then((res) => {
        console.log(res.data);
        setPreSignedUrl(res.data);
      });
    } catch (e) {}
  };

  useEffect(() => {
    getPresignedUrl();
  });

  // useEffect(() => {
  //   if (uploadImage === undefined) return;
  //   handleUploadImage(uploadImage);
  // }, [uploadImage]);

  // useEffect(() => {
  //   console.log(imageUrl, "imageUrl");
  // }, [imageUrl]);

  const userinfoHandler = async () => {
    try{
    await axios
      .put(presignedUrl, uploadImage)
      .then((res) => console.log(res.data, "upload image"));
    }catch(e){
      console.log(e)
    }
    const data = {
      nickname: nicknameRef.current?.value,
      avatar: "zxc",
    };
    try {
      const response = await instance.patch(
        "/auth/signup",
        JSON.stringify(data)
      );
      if (response.status === 200) navigate("/");
    } catch (error) {
      console.error("Error occurred during login authentication:", error);
    }
  };

  return (
    <section className="flex flex-col justify-between w-full h-screen">
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
            <ProfileImageInput
              setUploadImage={setUploadImage}
              uploadImage={uploadImage}
            />
            <NickNameInput nicknameRef={nicknameRef} />
          </section>
        </section>
      </section>
      <button
        className="pb-20 font-[Pretendard-SemiBold] text-base md:text-xl lg:text-2xl"
        onClick={userinfoHandler}
      >
        다음
      </button>
    </section>
  );
};

export default LoginUserInfo;
