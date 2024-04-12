import InChattingHeader from "./InChattingHeader";
import testProfile from "../../../../img/Login/defaultProfileImage.svg";
import sendMessage from "../../../../img/Chatting/sendMsg.svg";

const InChatting = (): JSX.Element => {
  return (
    <section className="flex flex-col justify-between h-full">
      <section>
        <InChattingHeader />
        <section className="p-3">
          <ul className="flex flex-col">
            {/* opponent message */}
            <li className="flex items-start mb-5">
              <img
                src={testProfile}
                alt=""
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14 mr-2"
              />
              <section className="flex flex-col">
                <span className="text-[#a0a0a0] font-[Pretendard-Medium]">
                  룰루랄라
                </span>
                <span className="text-[#3f3f3f] bg-white rounded-2xl py-2 px-3.5 mt-2 text-left">
                  랭킹 점수 어떻게 올리나요?
                </span>
              </section>
              <section className="self-end text-[rgba(255,255,255,0.5)] text-[12px] md:text-base ml-2">
                오후 7:30
              </section>
            </li>
            {/* opponent message */}
            {/* my message*/}
            <li className="mb-5 self-end flex">
              <section className="self-end text-[rgba(255,255,255,0.5)] text-[12px] md:text-base mr-2">
                오후 7:31
              </section>
              <section className="text-[#3f3f3f] bg-customGreen rounded-2xl py-2 px-3.5">
                래더게임 많이 해보세요!
              </section>
            </li>
            {/* my message*/}
            <li className="flex items-start mb-5">
              <img
                src={testProfile}
                alt=""
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14 mr-2 "
              />
              <section className="flex flex-col">
                <span className="text-[#a0a0a0] font-[Pretendard-Medium]">
                  룰루랄라
                </span>
                <span className="text-[#3f3f3f] bg-white rounded-2xl py-2 px-3.5 mt-2 text-left">
                  네 감사합니다!!
                </span>
              </section>
              <section className="self-end text-[rgba(255,255,255,0.5)] text-[12px] md:text-base ml-2">
                오후 7:32
              </section>
            </li>
            <li className="mb-5 self-end flex">
              <section className="self-end text-[rgba(255,255,255,0.5)] text-[12px] md:text-base mr-2">
                오후 7:31
              </section>
              <section className="text-[#3f3f3f] bg-customGreen rounded-2xl py-2 px-3.5 text-start">
                네네!
              </section>
            </li>
            <li className="flex items-start mb-5">
              <img
                src={testProfile}
                alt=""
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14 mr-2 "
              />
              <section className="flex flex-col">
                <span className="text-[#a0a0a0] font-[Pretendard-Medium]">
                  룰루랄라
                </span>
                <span className="text-[#3f3f3f] bg-white rounded-2xl py-2 px-3.5 mt-2 text-left">
                  안녕하세요~!!!
                </span>
              </section>
              <section className="self-end text-[rgba(255,255,255,0.5)] text-[12px] md:text-base ml-2">
                오후 7:33
              </section>
            </li>
          </ul>
        </section>
      </section>
      <section className="relative flex items-center mb-3">
        <input
          type="text"
          className="w-full bg-[#424242] rounded-full pl-4 py-3 outline-none  focus:border-customGreen focus:border-solid focus:border-[1px]"
        />
        <img
          src={sendMessage}
          alt="send message button"
          className="absolute right-4 w-8"
        />
      </section>
    </section>
  );
};

export default InChatting;
