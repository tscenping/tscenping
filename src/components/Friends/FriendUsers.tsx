import blockUsers from "../../img/Friends/blockUsers.svg";
import defaultProfile from "../../img/Friends/defaultProfile.svg";
import userSetting from "../../img/Friends/user3dot.svg";
import search from "../../img/Friends/searchIcon.svg";
import { nanoid } from "nanoid";

const dummyData = [
  { img: "dfsdf", nickname: "nickname" },
  { img: "dfsdf", nickname: "nickname" },
  { img: "dfsdf", nickname: "nickname" },
];

interface FriendUsersProps {
  setPageSection: (v: string) => void;
}

const FriendUsers = (props: FriendUsersProps): JSX.Element => {
  return (
    <>
      <section className="p-5">
        <section className="relative flex flex-col items-center">
          <label className="p-[8px]">친구검색</label>
          <input
            type="text"
            className="text-white bg-[#ffffff1a] w-full rounded-[16px] p-[8px] outline-none focus:placeholder-transparent"
            placeholder="닉네임을 입력해주세요"
          />
          <img
            src={search}
            alt="search users"
            className="absolute left-2 bottom-2"
          />
        </section>
        <section className="flex flex-col">
          <section className="flex justify-between py-[16px]">
            <strong>전체친구</strong>
            <strong
              className="flex text-[12px] text-[#939393]"
              onClick={() => {
                props.setPageSection("block");
              }}
            >
              <img
                src={blockUsers}
                className="mr-[8px] w-[16px]"
                alt="block users icon"
              />
              차단친구
            </strong>
          </section>
          <section>
            <ul className="flex flex-col w-full">
              {dummyData.map((el) => (
                <li key={nanoid()} className="flex justify-between w-full">
                  <section className="flex items-center">
                    <img
                      src={defaultProfile}
                      className="py-3"
                      alt="default user profile"
                    />
                    <strong className="ml-[16px]">{el.nickname}</strong>
                  </section>
                  <img src={userSetting} alt="user setting icon" />
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
