import back from "../../../../img/Friends/backUsers.svg";
import setting from "../../../../img/Chatting/setting.svg";
import { useModalState } from "../../../../store/modal";

const InChattingHeader = (): JSX.Element => {
  const { setModalName } = useModalState();
  return (
    <>
      <header className="flex w-full justify-between items-center px-4 py-7">
        <img src={back} alt="" className="w-3 sm:w-3 md:w-4 cursor-pointer" />
        <section className="font-[Pretendard-SemiBold] text-lg sm:text-xl md:text-2xl">
          <strong className="mr-4">여기로 들어오세요 ~_~</strong>
          <span className="text-[#9e9e9e]">1/10</span>
        </section>
        <img
          src={setting}
          alt=""
          className="w-1 cursor-pointer"
          onClick={() => {
            setModalName("chatUserList");
          }}
        />
      </header>
    </>
  );
};

export default InChattingHeader;
