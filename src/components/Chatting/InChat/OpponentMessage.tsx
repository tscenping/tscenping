import { MessageType } from "types/ChatTypes";
import defaultProfile from "img/Login/defaultProfileImage.svg";

const OpponentMessage = (props: MessageType): JSX.Element => {
  return (
    <li className={`flex mb-5 w-full`}>
      <section className="mr-2.5">
        <img
          src={props.avatar ? props.avatar : defaultProfile}
          className="w-12 sm:w-14 rounded-full mt-[6px] border-[1px] border-solid border-[#424242]"
        />
      </section>
      <section className="w-full">
        <section className="flex flex-col">
          <span className="text-[#a0a0a0] font-[Pretendard-Medium]">
            {props.avatar ? props.nickname : "차단된 유저"}
          </span>
        </section>
        <section className="flex">
          <span
            className={`text-[#3f3f3f] bg-white rounded-2xl py-2 px-3.5 mt-2 text-left ${
              props.nickname === "" ? "max-w-full" : "max-w-3/5"
            }`}
          >
            {props.message}
          </span>
          <span className="self-end text-[rgba(255,255,255,0.5)] text-[12px] md:text-base ml-2 align-text-bottom">
            {props.time}
          </span>
        </section>
      </section>
    </li>
  );
};

export default OpponentMessage;
