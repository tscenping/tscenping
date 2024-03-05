import Container from "../components/Util/Container";
import blockUsers from "../img/Friends/blockUsers.svg";
import defaultProfile from "../img/Friends/defaultProfile.svg";
import userSetting from "../img/Friends/user3dot.svg";
import { nanoid } from "nanoid";

const dummyData = [
  { img: "dfsdf", nickname: "nickname" },
  { img: "dfsdf", nickname: "nickname" },
  { img: "dfsdf", nickname: "nickname" },
];

const FriendsPage = (): JSX.Element => {
  return (
    <Container>
      <section className="flex flex-col">
        <label>친구검색</label>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          className="text-black"
        />
      </section>
      <section className="flex flex-col">
        <section className="flex justify-between">
          <strong>전체친구</strong>
          <strong className="flex">
            <img src={blockUsers} />
            차단친구
          </strong>
        </section>
        <section>
          <ul className="flex flex-col w-full">
            {dummyData.map((el) => (
              <li key={nanoid()} className="flex justify-between w-full">
                <section className="flex items-center">
                  <img src={defaultProfile} className="p-3" />
                  <strong>{el.nickname}</strong>
                </section>
                <img src={userSetting} />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </Container>
  );
};

export default FriendsPage;
