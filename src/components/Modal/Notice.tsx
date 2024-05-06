import { useModalState } from "../../store/modal";
import { useNoticeModalState } from "../../store/modal";

const Notice = (): JSX.Element => {
  const { content } = useNoticeModalState();
  const { setModalName } = useModalState();

  return (
    <>
      <h1 className="flex w-full my-10 justify-center font-[Pretendard-SemiBold] text-base sm:text-base md:text-lg lg:text-xl">
        {content}
      </h1>
      <button
        className="flex py-2 items-center border-solid border-[1px] rounded-[20px] font-[Pretendard-SemiBold] justify-center text-black bg-white text-base sm:text-base md:text-lg lg:text-xl"
        onClick={() => {
          setModalName(null);
        }}
      >
        확인
      </button>
    </>
  );
};

export default Notice;
