import { useMutation, useQueryClient } from "@tanstack/react-query";
import defaultImg from "../../../../src/img/Main/DefaultPorfileImg.svg";
import { useModalState } from "../../../store/modal";
import { useUserProfileState } from "../../../store/profile";
import { instance } from "components/Util/axios";
import { useEffect, useState } from "react";

const svgWidth = 100;
const svgHeight = 100;

export default function ProfileUser({ refetch }: { refetch: Function }) {
  const { setModalName, setModalProps } = useModalState();
  const { userProfileState } = useUserProfileState();

  // 친구면
  // 친구삭제, 차단하기
  // 차단이면
  // 친구추가, 차단해제

  const friendHandler = async () => {
    try {
      if (userProfileState.isFriend) {
        await instance.delete(`/users/friends`, {
          data: { friendId: userProfileState.id },
        });
      } else {
        await instance.post(`/users/friends`, {
          friendId: userProfileState.id,
        });
      }
      refetch();
    } catch (e) {
      console.log(e);
    }
  };
  console.log(userProfileState)

  return (
    <section className="flex flex-row items-center gap-4 justify-normal">
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
      <div className="flex flex-col w-full h-full text-white strong">
        <div className="flex justify-between">
          <p>{userProfileState?.nickname}</p>
          <button
            className="border-2 border-white border-solid rounded-[20px] py-1 px-2 cursor-pointer"
            onClick={() => {
              setModalName("confirm");
              setModalProps({
                nickname: userProfileState?.nickname,
                confirmType: "friend",
                acceptFunction: friendHandler,
                confirmMsg: `${userProfileState?.nickname}님을 ${
                  userProfileState?.isFriend ? "친구 삭제" : "친구 추가"
                } 하시겠습니까?`,
                declineFunction: () => setModalName(null),
              });
            }}
          >
            {userProfileState?.isFriend ? "친구 삭제" : "친구 추가"}
          </button>
        </div>
        <p className="text-[#A9A9A9] mb-3 ">
          {userProfileState?.statusMessage}
        </p>
        <div className="flex justify-end gap-3 h-2/3">
          <button
            className="w-2/5 h-full text-black bg-[#F7F7F7] rounded-[10px]"
            onClick={() => {
              setModalName("confirm");
              setModalProps({
                confirmType: "chat",
                confirmMsg: "1:1 채팅을 시작하시겠습니까?",
              });
            }}
          >
            1:1 메세지
          </button>
          <button
            className="w-2/5 h-full bg-[#F7F7F7] text-black rounded-[10px]"
            onClick={() => {
              setModalName("gameInvite");
              setModalProps({
                nickname: userProfileState?.nickname,
                confirmType: "game",
                id: userProfileState?.id,
              });
            }}
          >
            게임 초대
          </button>
        </div>
      </div>
    </section>
  );
}
