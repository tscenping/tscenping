import userSetting from "../../img/Chatting/setting.svg";
import defaultProfile from "../../img/Login/defaultProfileImage.svg";
import lock from "../../img/Chatting/lock.svg";
import toggle from "../../img/Chatting/toggle.svg";

const dummyUserData = [
  {
    name: "정의연",
    userId: 1,
  },
  {
    name: "him",
    userId: 2,
  },
  {
    name: "임형우",
    userId: 3,
  },
  {
    name: "sangyeki",
    userId: 4,
  },
  {
    name: "김상엽",
    userId: 5,
  },
  {
    name: "최장호",
    userId: 6,
  },
  {
    name: "yubchoi",
    userId: 7,
  },
  {
    name: "jiyun",
    userId: 8,
  },
  {
    name: "한글열글자한글열글자",
    userId: 9,
  },
  {
    name: "jiyunjiyun",
    userId: 10,
  },
];

const ChatUserList = (): JSX.Element => {
  return (
    <section className="pl-5 text-base md:font-lg font-[Pretendard-SemiBold]">
      <header className="pt-14 pb-10">채팅 상대</header>
      <section>
        <ul className="pr-5">
          {dummyUserData &&
            dummyUserData.map((el) => {
              return (
                <li
                  className="flex items-center justify-between mb-3.5"
                  key={el.userId}
                >
                  <section className="flex items-center">
                    <img
                      src={defaultProfile}
                      className="rounded-full w-10 mr-3"
                    />
                    <span className="font-[Pretendard] text-sm">{el.name}</span>
                  </section>
                  <img src={userSetting} className="cursor-pointer" />
                </li>
              );
            })}
        </ul>
      </section>
      <section className="pt-10 pr-5">
        <h1 className="font-[Pretendard-SemiBold] text-base pb-8">
          채팅방 설정
        </h1>
        <ul>
          <li className="mb-5 flex justify-between">
            <span className="text-sm">채팅 모드 변경</span>
            <section className="flex items-end">
              <img src={lock} className="cursor-pointer" />
              <img src={toggle} className="ml-4 cursor-pointer" />
            </section>
          </li>
          <li className="text-sm">비밀번호 변경</li>
        </ul>
      </section>
    </section>
  );
};

export default ChatUserList;
