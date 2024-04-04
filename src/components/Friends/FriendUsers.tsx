import blockUsers from "../../img/Friends/blockUsers.svg";
import defaultProfile from "../../img/Friends/defaultProfile.svg";
import userSetting from "../../img/Friends/user3dot.svg";
import search from "../../img/Friends/searchIcon.svg";
import DropDown from "../DropDown/DropDown";
import { nanoid } from "nanoid";
import { DropDownTypes } from "../../types/DropDownTypes";
import { useState } from "react";

const dummyData = [
  { img: "dfsdf", nickname: "nickname" },
  { img: "dfsdf", nickname: "nickname" },
  { img: "dfsdf", nickname: "nickname" },
];

interface FriendUsersProps {
  setPageSection: (v: string) => void;
}

const FriendUsers = (props: FriendUsersProps): JSX.Element => {
  const [dropDownType, setDropDownType] = useState<DropDownTypes>("NONE");

  return (
    <>
      <section className="p-5">
        <section className="relative flex flex-col items-center">
          <label className="p-[8px] font-[Pretendard-Bold] md:text-2xl text-base">
            친구검색
          </label>
          <section className="w-full flex items-center">
            <input
              type="text"
              className="text-white bg-[#ffffff1a] w-full rounded-[16px] p-[8px] outline-none focus:placeholder-transparent my-4 pl-[40px]"
              placeholder="닉네임을 입력해주세요"
            />
            <img src={search} alt="search users" className="absolute left-4" />
          </section>
        </section>
        <section className="flex flex-col">
          <section className="flex justify-between pt-4 pb-3 items-center">
            <strong className="md:text-2xl text-base">전체친구</strong>
            <section className="cursor-pointer">
              <strong
                className="flex  md:text-xl text-sm text-[#939393]"
                onClick={() => {
                  props.setPageSection("block");
                }}
              >
                <img
                  src={blockUsers}
                  className="mr-[8px] w-[12px] md:w-[20px]"
                  alt="block users icon"
                />
                차단친구
              </strong>
            </section>
          </section>
          <section>
            <ul className="flex flex-col w-full">
              {dummyData.map((el) => (
                <li
                  key={nanoid()}
                  className="relative flex justify-between w-full"
                >
                  <section className="flex items-center">
                    <img
                      src={defaultProfile}
                      className="py-3"
                      alt="default user profile"
                    />
                    <strong className="ml-[16px]">{el.nickname}</strong>
                  </section>
                  {dropDownType === "NONE" ? (
                    <img
                      src={userSetting}
                      onClick={() => setDropDownType("NORMAL")}
                    />
                  ) : (
                    <DropDown
                      dropDonwType={dropDownType}
                      setDropDownType={setDropDownType}
                      normalProp={{
                        id: 1,
                        nickname: "nickname",
                        isFriend: true,
                        isBlocked: false,
                        setDropDownType: setDropDownType,
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>
        </section>
      </section>
    </>
  );
};

export default FriendUsers;
