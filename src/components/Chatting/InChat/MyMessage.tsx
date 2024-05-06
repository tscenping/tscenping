import { MessageType } from "types/ChatTypes";

const MyMessage = (props: MessageType): JSX.Element => {
  return (
    <li className="mb-5 flex w-full justify-end">
      <section className="self-end text-[rgba(255,255,255,0.5)] text-[12px] md:text-base mr-2 grow-5">
        {props.time}
      </section>
      <span className="text-[#3f3f3f] font-[Pretendard] bg-customGreen rounded-2xl py-2 px-3.5 grow-5 max-w-3/5 self-end break-words whitespace-pre-line">
        {props.message}
      </span>
    </li>
  );
};

export default MyMessage;
