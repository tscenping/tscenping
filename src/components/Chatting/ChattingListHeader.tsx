import { useModalState } from "../../store/modal";
import { useLocation } from "react-router-dom";
import createChatting from "../../img/InChatting/createChatting.svg";

const ChattingListHeader = (): JSX.Element => {
  const location = useLocation();
  const pathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const { setModalName } = useModalState();
  return (
    <section className="px-4 py-7">
      <section className="flex w-full justify-between items-center">
        <span className="text-[20px] font-bold md:text-[24px]">
          {pathName === "inchatting" ? "참여중인 전체 채팅방" : "오픈 채팅방"}
        </span>
        <img
          src={createChatting}
          alt="create chatting room"
          className="w-[40px] cursor-pointer"
          onClick={() => setModalName("createChatMode")}
        />
      </section>
    </section>
  );
};

export default ChattingListHeader;
