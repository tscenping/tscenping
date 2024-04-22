import { useUserProfileState } from "../../../store/profile";
import defaultImg from "../../../../src/img/Main/DefaultPorfileImg.svg";
import imgEditBtn from "../../../img/Profile/EditBtn.svg";
import textEditBtn from "../../../img/Profile/editTextBtn.svg";

import { useEffect, useRef, useState } from "react";
import { instance } from "../../Util/axios";
import { useQueryClient } from "@tanstack/react-query";

const svgWidth = 60;
const svgHeight = 60;

interface MyProfileProps {
  refetch: Function;
}

export default function ProfileMe(props: MyProfileProps) {
  const { userProfileState, setUserProfile } = useUserProfileState();
  const [isMsgEdit, setIsMsgEdit] = useState(false);
  const [isImgEdit, setIsImgEdit] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [statusMsg, setStatusMsg] = useState<string>(
    userProfileState.statusMessage
  );

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

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    if (inputText.length <= 20) {
      // 입력한 텍스트가 20자 이하인 경우에만 업데이트
      setStatusMsg(inputText);
    }
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

  const handleEditProfileImg = () => {
    if (isImgEdit) {
      submitImg();
      setIsImgEdit(!isImgEdit);
      const updatedUserProfileState = {
        ...userProfileState, // 이전 상태 복사
        avatar: imgUrl, // 변경된 상태 메시지 할당
      };
      setUserProfile(updatedUserProfileState);
    } else {
      setIsImgEdit(!isImgEdit);
    }
  };

  const submitStatusMessage = async () => {
    await instance
      .patch("/users/me/statusMessage", { statusMessage: statusMsg })
      .then(function (res) {
        props.refetch();
      });
  };

  const submitImg = async () => {
    await instance
      .patch("/users//me/avatar", { avatar: imgUrl })
      .then(function (res) {
        props.refetch();
      });
  };
  // /me/avatar
  return (
    <section className="flex flex-col items-center gap-3 justify-normal">
      <div className="relative ">
        <img
          src={
            userProfileState?.avatar === null
              ? defaultImg
              : userProfileState?.avatar
          }
          alt="profile img"
          width={svgWidth}
          height={svgHeight}
          className="rounded-[30px] md:rounded-[40px] object-cover"
        />
        <img
          src={imgEditBtn}
          alt="editBtn"
          className="absolute bottom-0 w-1/5 right-1"
        />
      </div>
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
        <div className="bg-[#2D2D2D] flex justify-between rounded-[10px] p-4">
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
