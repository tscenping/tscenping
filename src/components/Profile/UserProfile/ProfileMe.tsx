import { useUserProfileState } from "../../../store/profile";
import defaultImg from "../../../../src/img/Main/DefaultPorfileImg.svg";
import imgEditBtn from "../../../img/Profile/EditBtn.svg";

import { useEffect, useRef, useState } from "react";
import ProfileImgEdit from "./ProfileImgEdit";
import useAxios from "hooks/useAxios";

const svgWidth = 60;
const svgHeight = 60;

interface MyProfileProps {
  refetch: Function;
}

export default function ProfileMe(props: MyProfileProps) {
  const { userProfileState, setUserProfile } = useUserProfileState();
  const [isMsgEdit, setIsMsgEdit] = useState(false);
  const [isImgEdit, setIsImgEdit] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>(
    userProfileState.statusMessage
  );
  const instance = useAxios();

  useEffect(() => {
    setStatusMsg(userProfileState.statusMessage);
  }, [userProfileState]);

  useEffect(() => {
    if (isMsgEdit && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isMsgEdit]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function isWithinThreeDays(fileName: string) {
    if (userProfileState.avatar === null) return false;
    // 파일명에서 날짜 부분을 추출
    const dateString = fileName.slice(-11, -5); // 파일명에서 년월일 부분 추출

    // 오늘 날짜와의 차이를 계산
    const today = new Date();
    const year = String(today.getFullYear()).slice(-2); // 연도
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월
    const day = String(today.getDate()).padStart(2, "0"); // 일
    const formattedDate = `${year}${month}${day}`;
    // 3일 이내인지 확인
    return formattedDate === dateString;
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    if (inputText.length <= 20) {
      // 입력한 텍스트가 20자 이하인 경우에만 업데이트
      setStatusMsg(inputText);
    }
  };

  const handleImgEdit = () => {
    if (isWithinThreeDays(userProfileState.avatar)) {
      alert("프로필 사진은 하루에 한 번만 변경할 수 있습니다.");
      return;
    }
    setIsImgEdit(!isImgEdit);
  };

  const handleEditProfileMsg = () => {
    if (isMsgEdit) {
      submitStatusMessage();
      setIsMsgEdit(!isMsgEdit);
      const updatedUserProfileState = {
        ...userProfileState, // 이전 상태 복사
        statusMessage: statusMsg, // 변경된 상태 메시지 할당
      };
      setUserProfile(updatedUserProfileState);
    } else {
      setIsMsgEdit(!isMsgEdit);
    }
  };

  const submitStatusMessage = async () => {
    await instance
      .patch("/users/me/statusMessage", { statusMessage: statusMsg })
      .then(function (res) {
        props.refetch();
      });
  };

  return (
    <section className="flex flex-col items-center gap-3 justify-normal">
      {isImgEdit ? (
        <ProfileImgEdit refetch={props.refetch} setIsImgEdit={setIsImgEdit} />
      ) : (
        <div className="relative ">
          <img
            src={
              userProfileState?.avatar === null
                ? defaultImg
                : userProfileState?.avatar
            }
            alt="profileImg"
            width={svgWidth}
            height={svgHeight}
            className="rounded-full object-cover w-[54px] h-[54px] md:w-[62px] md:h-[62px] lg:w-[70px] lg:h-[70px]"
          />
          <img
            src={imgEditBtn}
            alt="editBtn"
            className="absolute w-1/3 cusor-pointer -bottom-1 right-1"
            onClick={() => handleImgEdit()}
          />
        </div>
      )}
      {/* </div> */}
      <div className="text-white strong">{userProfileState?.nickname}</div>
      {!isMsgEdit ? (
        <section className="flex items-center justify-center w-full gap-3">
          {userProfileState?.statusMessage ? (
            <p className="text-[#A9A9A9] w-auto">
              {userProfileState?.statusMessage}
            </p>
          ) : (
            <p className="text-[#A9A9A9] ">작성된 메세지가 없습니다.</p>
          )}
          <button
            onClick={handleEditProfileMsg}
            className="w-auto px-3 py-1 bg-customGreen rounded-[10px] text-black font-extrabold hover:scale-105 transition-transform duration200 ease-in-out"
          >
            수정
          </button>
        </section>
      ) : (
        <div className="bg-[#2D2D2D] flex justify-between rounded-[10px] p-4 gap-2">
          <textarea
            rows={4}
            cols={50}
            id="profileMsg"
            value={statusMsg}
            onChange={handleTextChange}
            className="w-full h-14 p-2 resize-none bg-[#2D2D2D] text-white strong rounded-[10px] "
            ref={textareaRef}
          />
          <button
            className="w-1/5 bg-customGreen rounded-[10px] text-black font-extrabold hover:scale-105 transition-transform duration200 ease-in-out"
            onClick={handleEditProfileMsg}
          >
            완료
          </button>
        </div>
      )}
    </section>
  );
}
