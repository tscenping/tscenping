import { ChangeEvent, RefObject } from "react";
import search from "../../img/Friends/searchIcon.svg";
import { UserStatusType } from "types/UserTypes";

interface searchUserType {
  id: number;
  nickname: string;
  avatar: string;
  status: UserStatusType;
  isBlocked: boolean;
  isFriend: boolean;
}

interface SearchUserInputProps {
  nicknameRef: RefObject<HTMLInputElement>;
  searchUserInput: string;
  setSearchUserInput: (v: string) => void;
  setSearchUser: (v: searchUserType | undefined) => void;
  searchUser: searchUserType | undefined;
}

const SearchUserInput = (props: SearchUserInputProps): JSX.Element => {
  const searchUserInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.setSearchUserInput(e.target.value);
    if (!props.searchUserInput.length) {
      props.setSearchUser(undefined);
    }
  };

  return (
    <>
      <label className="p-2 font-[Pretendard-Bold] md:text-2xl text-base">
        친구검색
      </label>
      <section className="w-full flex items-center">
        <input
          type="text"
          className="text-white bg-[#ffffff1a] w-full rounded-[16px] py-3 outline-none focus:placeholder-transparent my-4 pl-10"
          placeholder="닉네임을 입력해주세요"
          ref={props.nicknameRef}
          onChange={searchUserInputHandler}
          maxLength={10}
        />
        <button className="flex items-center">
          <img src={search} alt="search users" className="absolute left-4" />
        </button>
      </section>
    </>
  );
};

export default SearchUserInput;
