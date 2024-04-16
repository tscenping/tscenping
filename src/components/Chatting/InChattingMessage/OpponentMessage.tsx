import { MessageTypes } from "../../../types/ChatTypes";

const OpponentMessage = (props: MessageTypes): JSX.Element => {
  return (
    <li className="flex items-start mb-5 w-full">
      <section className="flex flex-col max-w-3/5">
        <span className="text-[#a0a0a0] font-[Pretendard-Medium]">
          {props.nickname}
        </span>
        <span className="text-[#3f3f3f] bg-white rounded-2xl py-2 px-3.5 mt-2 text-left">
          {props.message}
        </span>
      </section>
      <section className="self-end text-[rgba(255,255,255,0.5)] text-[12px] md:text-base ml-2">
        {props.time}
      </section>
    </li>
  );
};

export default OpponentMessage;
