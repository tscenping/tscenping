import defaultProfile from "../../img/Friends/defaultProfile.svg";
import backFriends from "../../img/Friends/backUsers.svg";
import { nanoid } from "nanoid";

const dummyData = [
  { img: "dfsdf", nickname: "nickname" },
  { img: "dfsdf", nickname: "nickname" },
  { img: "dfsdf", nickname: "nickname" },
];

interface BlockUsersProps {
  setPageSection: (v: string) => void;
}

const BlockUsers = (props: BlockUsersProps): JSX.Element => {
  return (
    <>
      <section className="p-5">
        <section className="relative flex justify-center items-center">
          <img
            src={backFriends}
            alt="go back friend users icon"
            className="absolute left-0"
            onClick={() => {
              props.setPageSection("friend");
            }}
          />
          <h1 className="font-[16px]">차단한 친구</h1>
        </section>
        <section className="flex flex-col">
          <section className="flex justify-between py-[16px]"></section>
          <section>
            <ul className="flex flex-col w-full">
              {dummyData.map((el) => (
                <li
                  key={nanoid()}
                  className="flex justify-between items-center w-full py-4"
                >
                  <section className="flex items-center">
                    <img src={defaultProfile} className="" />
                    <strong className="ml-[16px]">{el.nickname}</strong>
                  </section>
                  <button className="bg-[#e2e2e2] text-black text-[12px] px-3 py-1 rounded-[30px] font-['Pretendard-SemiBold']">
                    차단해제
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </section>
    </>
  );
};

export default BlockUsers;
