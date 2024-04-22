import { RefObject, FormEvent } from "react";
import sendMessage from "img/Chatting/sendMsg.svg";

interface MessageInputProps {
  messageRef: RefObject<HTMLInputElement>;
  sendMessageHandler: (e: FormEvent<HTMLFormElement>) => void;
}

const MessageInput = (props: MessageInputProps): JSX.Element => {
  return (
    <form
      className="relative flex items-center mb-3"
      onSubmit={props.sendMessageHandler}
    >
      <input
        type="text"
        className="w-full bg-[#424242] rounded-full pl-4 py-3 outline-none pr-12"
        maxLength={500}
        ref={props.messageRef}
      />
      <img
        src={sendMessage}
        alt="send message button"
        className="absolute right-4 w-8 "
      />
    </form>
  );
};

export default MessageInput;
