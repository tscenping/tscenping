import profileImageBtn from "../../../img/Login/profileImageBtn.svg";
import Resizer from "react-image-file-resizer";
import defaultImg from "../../../img/Login/defaultProfileImage.svg";
import { useEffect, useState } from "react";
import { instance } from "components/Util/axios";

interface ProfileImageInputProps {
  setUploadImage: (v: File) => void;
  uploadImage?: File;
}

const maxFileSize = 3 * 1024 * 1024;

const ProfileImageInput = (props: ProfileImageInputProps): JSX.Element => {
  const [imgString, setImgString] = useState<string | null>(null);
  

  const profileImageStyle =
    "w-[69px] h-[69px] mb-2 md:w-[88px] md:h-[88px] cursor-pointer rounded-[30px] md:rounded-[40px] object-cover";

  const profileImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files !== null) {
      const file = e.target?.files[0];
      const fileSize = file?.size;
      if (fileSize && fileSize > maxFileSize) {
        alert("3MB 이하의 이미지만 업로드 가능합니다.");
        e.target.value = "";
        return;
      }
      const supportedFormats = ["image/jpeg", "image/png", "image/svg+xml"];
      if (!file) return;
      if (!supportedFormats.includes(file.type)) {
        alert(
          "지원되지 않은 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요."
        );
        return;
      }

      try {
        props.setUploadImage(file);
        const reader = new FileReader();
        reader.onload = () => {
          const url = reader.result as string;
          setImgString(url);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.log("file resizing failed");
      }
    }
  };

  return (
    <section className="rounded-[30px] mb-5 flex flex-col items-center ">
      <label htmlFor="profileImage">
        <div className="relative flex cursor-pointer">
          <img
            src={imgString ? imgString : defaultImg}
            alt="default profile"
            className={profileImageStyle}
          />
          <img
            src={profileImageBtn}
            alt="profile button"
            className="absolute bottom-2 right-0 w-5 md:w-[24px] hover:scale-125 transition-scale duration-200"
          />
        </div>
      </label>
      <input
        type="file"
        id="profileImage"
        accept="image/jpeg, image/png"
        className="hidden"
        onChange={profileImageHandler}
      />
      <strong className="text-customGreen font-[Pretendard-Regular]">
        사진은 1장, JPEG, PNG, SVG파일만 가능해요
      </strong>
    </section>
  );
};

export default ProfileImageInput;
