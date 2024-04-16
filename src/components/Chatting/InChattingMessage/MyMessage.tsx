import { MessageTypes } from "../../../types/ChatTypes";

const MyMessage = (props: MessageTypes): JSX.Element => {
  return (
    <li className="mb-5 flex w-full justify-end">
      <section className="self-end text-[rgba(255,255,255,0.5)] text-[12px] md:text-base mr-2 grow-5">
        {props.time}
      </section>
      <section className="text-[#3f3f3f] bg-customGreen rounded-2xl py-3 px-3.5 grow-5 max-w-3/5 self-end">
        {props.message}
      </section>
    </li>
  );
};

export default MyMessage;
