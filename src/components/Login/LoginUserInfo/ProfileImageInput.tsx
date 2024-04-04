import profileImageBtn from "../../../img/Login/profileImageBtn.svg";
import Resizer from "react-image-file-resizer";

interface ProfileImageInputProps {
  setUploadImage: (v: string) => void;
  uploadImage: string;
}

const ProfileImageInput = (props: ProfileImageInputProps): JSX.Element => {
  const profileImageStyle =
    "w-[69px] h-[69px] mb-2 md:w-[88px] md:h-[88px] cursor-pointer rounded-[30px] md:rounded-[40px] object-cover";

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        240 /* width */,
        240 /* height */,
        "SVG" /* 파일형식 */,
        100 /* quality */,
        0 /* rotation */,
        (uri) => {
          /* resize new image with url*/
          resolve(uri);
        },
        "base64" /* output Type */
      );
    });

  const profileImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files !== null) {
      const file = e.target?.files[0];
      const supportedFormats = ["image/jpeg", "image/png", "image/svg+xml"];
      if (!file) return;
      if (!supportedFormats.includes(file.type)) {
        alert(
          "지원되지 않은 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요."
        );
        return;
      }
      try {
        const compressedFile = await resizeFile(file);
        props.setUploadImage(String(compressedFile));
      } catch (error) {
        console.log("file resizing failed");
      }
    }
  };

  return (
    <section className="rounded-[30px] mb-5 flex flex-col items-center">
      <label htmlFor="profileImage">
        <div className="relative flex cursor-pointer">
          <img
            src={props.uploadImage}
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
        accept="image/*"
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
