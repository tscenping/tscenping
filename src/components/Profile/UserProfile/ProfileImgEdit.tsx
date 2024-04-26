import { useEffect, useState } from "react";
import defaultImg from "../../../img/Login/defaultProfileImage.svg";
import profileImageBtn from "../../../img/Login/profileImageBtn.svg";
import { instance } from "components/Util/axios";
import axios from "axios";
import { resizeImage } from "components/Util/ImageResizing";

interface ProfileImgEditProps {
  refetch: Function;
  setIsImgEdit: Function;
}

const maxFileSize = 3 * 1024 * 1024;

export default function ProfileImgEdit(props: ProfileImgEditProps) {
  const [imgString, setImgString] = useState<string | null>(null);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [preSignedUrl, setPreSignedUrl] = useState<string | null>(null);

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
        const resizingFile = await resizeImage({
          file,
          maxWidth: 200,
          maxHeight: 200,
          quality: 0.8,
        });
        setUploadImage(resizingFile);
        const reader = new FileReader();
        reader.onload = () => {
          const url = reader.result as string;
          setImgString(url);
        };
        reader.readAsDataURL(resizingFile);
      } catch (error) {
        console.log("file resizing failed");
      }
    }
  };
  const imgEditCancelHandler = () => {
    props.setIsImgEdit(false);
  };

  const imgUploadHandler = async () => {
    if (uploadImage === null) {
      alert("기본 이미지로 설정 됩니다.");
      // return;
    }
    try {
      await instance
        .patch("/users/me/avatar", {
          avatar: uploadImage === null ? false : true,
        })
        .then((res) => {
          console.log(res.data);
          setPreSignedUrl(res.data.preSignedUrl);
          if (res.data.preSignedUrl === null) {
            props.refetch();
            props.setIsImgEdit(false);
          }
        });
      // await instance.get("/users/avatar").then((res) => {
      //   console.log(res.data);
      //   setPreSignedUrl(res.data);
      // });
    } catch (e) {
      console.log(e);
    }
  };

  const putS3Image = async () => {
    console.log(222);
    try {
      if (preSignedUrl !== null) {
        console.log(333);
        console.log(preSignedUrl, "업로드");
        await axios
          .put(preSignedUrl, uploadImage)
          .then((res) => console.log(res.data, "upload image"));
        props.refetch();
        props.setIsImgEdit(false);
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    putS3Image();
    console.log("useEffect");
  }, [preSignedUrl]);

  return (
    <>
      <section className="rounded-[30px] flex flex-col items-center ">
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
          accept="image/jpeg"
          className="hidden"
          onChange={profileImageHandler}
        />
        <strong className="text-customGreen font-[Pretendard-Regular]">
          사진은 1장 JPEG 파일만 가능합니다.
        </strong>
        <p className=" text-[#A9A9A9]">
          이미지 없이 제출 시 기본 이미지가 적용됩니다.
        </p>
        <section className="flex gap-3">
          <button
            className="w-auto mt-1 px-3 py-1 bg-customGreen rounded-[10px] text-black font-extrabold hover:scale-105 transition-transform duration200 ease-in-out "
            onClick={imgUploadHandler}
          >
            제출
          </button>
          <button
            className="w-auto mt-1 px-3 py-1 bg-white rounded-[10px] text-black font-extrabold hover:scale-105 transition-transform duration200 ease-in-out"
            onClick={imgEditCancelHandler}
          >
            취소
          </button>
        </section>
      </section>
    </>
  );
}
