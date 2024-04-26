import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NickNameInput from "./NicknameInput";
import ProfileImageInput from "./ProfileImageInput";
import useAxios from "../../../hooks/useAxios";
import useImage from "../../../hooks/useImage";
import { useMyData } from "store/profile";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";

const defaultImage = process.env.REACT_APP_DEFAULT_PROFILE;

const LoginUserInfo = (): JSX.Element => {
  const instance = useAxios();
  const [uploadImage, setUploadImage] = useState<File>();
  const navigate = useNavigate();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const { handleUploadImage, imageUrl } = useImage();
  const { setMyData, myData } = useMyData();

  const firebaseConfig = {
    projectId: "tscenping",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const addDataToCollection = async (nickname: string) => {
    try {
      const docRef = await addDoc(collection(db, nickname), {});
      console.log("Document create success : ", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (uploadImage === undefined) return;
    handleUploadImage(uploadImage);
  }, [uploadImage]);

  useEffect(() => {
    console.log(imageUrl, "imageUrl");
  }, [imageUrl]);

  const userinfoHandler = async () => {
    const data = {
      nickname: nicknameRef.current?.value,
      avatar:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABFCAYAAAAcjSspAAAAAXNSR0IArs4c6QAAAkFJREFUeF7tmL+KwkAQh08haCN2KW3EJ8g9kz6TPtNZW4iNpV2wUQSRORgYufXut5v9k8OfVdA12f32m9nJDHa7XfPBzxOBAaH8NIJQHFFCKISCJU+aQlNoCkaApmCcmFNoCk3BCNAUjBNzCk2hKRgBmoJxKp5TTqdTc7lcmtvt1lRVtZVpj8fjbV3X39clPsWgCIy2bdevFj0ajTaz2WzzNlCOx+Pyer0uZcHD4XArhogdYox8p7/JdQk42U2xQKbT6epVmKDjUpiUFYoNGcQABSM2zefzVQoArntmhaKLRIDoZA+Hw/p+vze/WRUbVlYoIQsM+U9XSFmh7Pf7L5nwYrH4RCeuIZczhHoPJSTkUOCvxmWFEhIKbwOFidY4ao9k5DSxtYpPHvpX4SOT1RD6K3H61jRdQdj/Z80p+mA9hbSMty+AAuN8Pi+lNnmbMl/B2NDo20thEVMsGLmWtoGaYV8QS7UPikKJmQdi3otQHDQJhVCwIKMpJUyxjWk9YbD9eh6lp5J8m7p3m9QUpBYJAZS6qEsGRct5WYDs8mQy2XSpO9Q4uZ82tn1eLH3gJ4Fie6tdYbgWk7qpHR2K75uwzw7asSmb2tGh5GwKhTStkE2IDiXVRF2LSfWs6FBCmtPI7rnGpGpqE0qO4o2mOCgTSk+gxC7ioucUSX7Cqkv16pN45XmxnxUdis+C+jqWUHKcPn3dfZ950RSagvlCU2gKTcEI0BSME3MKTaEpGAGagnFiTqEpNAUjQFMwTswpDk4PSkdN/PWfo00AAAAASUVORK5CYII=",
    };
    try {
      const response = await instance.patch(
        "/auth/signup",
        JSON.stringify(data)
      );
      if (response.status === 200) {
        if (nicknameRef.current) {
          addDataToCollection(nicknameRef.current?.value);
        }
        setMyData({ ...myData, nickname: nicknameRef.current?.value });
        navigate("/");
      }
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
            {/* <ProfileImageInput
              setUploadImage={setUploadImage}
              uploadImage={uploadImage}
            /> */}
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
