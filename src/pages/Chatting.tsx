import Container from "../components/Util/Container";
import createChatting from "../img/InChatting/createChatting.svg";
import publicChatting from "../img/Chatting/publicChatting.svg";
import passwordChatting from "../img/Chatting/passwordChatting.svg";

const ChattingPage = (): JSX.Element => {
  const inChattingListStyle =
    "bg-[#424242] p-3 px-4 rounded-[20px] my-[24px] cursor-pointer transition duration-300 ease-in-out hover:scale-110";

  return (
    <Container>
      <section className="p-7">
        <section className="flex w-full justify-between items-center">
          <span className="text-[16px] font-bold md:text-[24px]">
            참여중인 오픈 채팅방
          </span>
          <img
            src={createChatting}
            alt="create chatting room"
            className="w-[40px]"
          />
        </section>
        <ul>
          <li className={`flex ${inChattingListStyle} w-full justify-between`}>
            <section className="flex items-center">
              <img src={publicChatting} alt="public chatting room" />
              <span className="ml-[8px]">어서오세요!</span>
            </section>
            <span className="ml-[8px] text-[#939393]">1 / 3</span>
          </li>
          <li className={`flex ${inChattingListStyle} w-full justify-between`}>
            <section className="flex">
              <img src={publicChatting} alt="public chatting room" />
              <span className="ml-[8px]">아무나 환영합니다!</span>
            </section>
            <span className="ml-[8px] text-[#939393]">2 / 3</span>
          </li>
        </ul>
      </section>
      <section className="p-7">
        <section className="flex w-full justify-between items-center">
          <span className="text-[16px] font-bold md:text-[24px]">
            전체 오픈 채팅방
          </span>
        </section>
        <ul className="">
          <li className={`flex ${inChattingListStyle} w-full justify-between`}>
            <section className="flex items-center">
              <img src={publicChatting} alt="public chatting room" />
              <span className="ml-[8px]">아무나 들어오세요!</span>
            </section>
            <span className="ml-[8px] text-[#939393]">1 / 3</span>
          </li>
          <li className={`flex ${inChattingListStyle} w-full justify-between`}>
            <section className="flex items-center">
              <img src={passwordChatting} alt="public chatting room" />
              <span className="ml-[8px]">게임하실분!</span>
            </section>
            <span className="ml-[8px] text-[#939393]">1 / 3</span>
          </li>
          <li className={`flex ${inChattingListStyle} w-full justify-between`}>
            <section className="flex items-center">
              <img src={passwordChatting} alt="public chatting room" />
              <span className="ml-[8px]">게임하실분!</span>
            </section>
            <span className="ml-[8px] text-[#939393]">1 / 3</span>
          </li>
          <li className={`flex ${inChattingListStyle} w-full justify-between`}>
            <section className="flex items-center">
              <img src={passwordChatting} alt="public chatting room" />
              <span className="ml-[8px]">게임하실분!</span>
            </section>
            <span className="ml-[8px] text-[#939393]">1 / 3</span>
          </li>
          <li className={`flex ${inChattingListStyle} w-full justify-between`}>
            <section className="flex items-center">
              <img src={passwordChatting} alt="public chatting room" />
              <span className="ml-[8px]">게임하실분!</span>
            </section>
            <span className="ml-[8px] text-[#939393]">1 / 3</span>
          </li>
          <li className={`flex ${inChattingListStyle} w-full justify-between`}>
            <section className="flex items-center">
              <img src={passwordChatting} alt="public chatting room" />
              <span className="ml-[8px]">게임하실분!</span>
            </section>
            <span className="ml-[8px] text-[#939393]">1 / 3</span>
          </li>
          <li className={`flex ${inChattingListStyle} w-full justify-between`}>
            <section className="flex items-center">
              <img src={passwordChatting} alt="public chatting room" />
              <span className="ml-[8px]">게임하실분🚀</span>
            </section>
            <span className="ml-[8px] text-[#939393]">1 / 3</span>
          </li>
          <li className={`flex ${inChattingListStyle} w-full justify-between`}>
            <section className="flex items-center">
              <img src={passwordChatting} alt="public chatting room" />
              <span className="ml-[8px]">게임하실분!</span>
            </section>
            <span className="ml-[8px] text-[#939393]">1 / 3</span>
          </li>
        </ul>
      </section>
    </Container>
  );
};

export default ChattingPage;
