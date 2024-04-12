import { useState } from "react";
import search from "../../../img/Friends/searchIcon.svg";
import defaultImage from "../../../img/Login/defaultProfileImage.svg";
import userCheck from "../../../img/Main/SpecialCheck.svg";
import userUncheck from "../../../img/Main/SpecialUncheck.svg";

const InviteChat = (): JSX.Element => {
  const [userNickname, setUserNickname] = useState<string>("");

  const selectUserHandler = (nickname: string) => {
    if (userNickname === nickname) setUserNickname("");
    else setUserNickname(nickname);
  };

  return (
    <>
      <section className="px-4 py-7">
        <section className="flex w-full justify-between items-center pb-3">
          <span className="text-base font-[Pretendard-Bold] md:text-[24px]">
            채팅방 초대
          </span>
          <span className="text-base font-[Pretendard]">완료</span>
        </section>
        <section className="relative flex flex-col items-center">
          <section className="w-full flex items-center">
            <input
              type="text"
              className="text-white bg-[#ffffff1a] w-full rounded-[16px] py-3 outline-none focus:placeholder-transparent my-4 pl-10"
              placeholder="닉네임을 입력해주세요"
            />
            <img src={search} alt="search users" className="absolute left-4" />
          </section>
        </section>
        <ul className="mt-5">
          <li
            className="flex justify-between mb-7 items-center cursor-pointer"
            onClick={() => {
              selectUserHandler("Sooyang");
            }}
          >
            <label className="flex items-center" htmlFor="user1">
              <img src={defaultImage} className="rounded-full w-10 mr-3" />
              <span className="text-base">Sooyang</span>
            </label>
            <section>
              <input
                type="checkbox"
                id="user1"
                className="hidden"
                name="friendUser"
                value="Sooyang"
              />
              <img
                src={userNickname === "Sooyang" ? userCheck : userUncheck}
                alt="check user"
              />
            </section>
          </li>
          <li
            className="flex justify-between mb-7 items-center cursor-pointer"
            onClick={() => {
              selectUserHandler("KOTA");
            }}
          >
            <label className="flex items-center" htmlFor="user2">
              <img src={defaultImage} className="rounded-full w-10 mr-3" />
              <span className="text-base">KOTA</span>
            </label>
            <section>
              <input
                type="checkbox"
                id="user2"
                className="hidden"
                name="friendUser"
                value="KOTA"
              />
              <img
                src={userNickname === "KOTA" ? userCheck : userUncheck}
                alt="check user"
              />
            </section>
          </li>
          <li
            className="flex justify-between mb-7 items-center cursor-pointer"
            onClick={() => {
              selectUserHandler("HIM");
            }}
          >
            <label className="flex items-center" htmlFor="user3">
              <img src={defaultImage} className="rounded-full w-10 mr-3" />
              <span className="text-base">HIM</span>
            </label>
            <section>
              <input
                type="checkbox"
                id="user3"
                className="hidden"
                name="friendUser"
                value="HIM"
              />
              <img
                src={userNickname === "HIM" ? userCheck : userUncheck}
                alt="check user"
              />
            </section>
          </li>
        </ul>
      </section>
    </>
  );
};

export default InviteChat;
