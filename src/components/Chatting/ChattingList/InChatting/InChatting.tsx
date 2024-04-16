import InChattingHeader from "./InChattingHeader";
import sendMessage from "../../../../img/Chatting/sendMsg.svg";
import OpponentMessage from "../../InChattingMessage/OpponentMessage";
import MyMessage from "../../InChattingMessage/MyMessage";
import { nanoid } from "nanoid";

const InChatting = (): JSX.Element => {
  return (
    <section className="flex flex-col justify-between h-full">
      <section className="h-9/10 xs:h-5/6 xxs:h-4/5 md:h-5/6 lg:h-9/10 relative">
        <InChattingHeader />
        <section className="p-3 h-full">
          <ul className="flex flex-col overflow-y-auto h-full scrollbar-hide ">
            <OpponentMessage
              nickname="WONLIM"
              message="안녕하세요~"
              time="오후 7:30"
              key={nanoid()}
            />
            <MyMessage
              nickname="sangyeki"
              message="안녕하세요!"
              time="오후 7:31"
              key={nanoid()}
            />
            <MyMessage
              nickname="sangyeki"
              message="안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요! 안녕하세요!"
              time="오후 7:31"
              key={nanoid()}
            />
            <OpponentMessage
              nickname="HIM"
              message="네 안녕하세요~"
              time="오후 7:30"
              key={nanoid()}
            />
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
