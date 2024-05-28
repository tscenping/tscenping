import { useModalState } from "../../store/modal";

export default function ModalConfirm() {
  const { prevName, setModalName, modalProps } = useModalState();
  return (
    <>
      <pre className="text-base md:text-lg lg:text-xl xl:text-2xl font-[Pretendard-SemiBold] pt-5 mb-1">
        {modalProps?.confirmMsg}
      </pre>
      <div className="flex pt-7">
        <button
          className="bg-customGreen text-[#404040] w-1/2 rounded-[20px] py-1.5 text-base mr-5 cursor-pointer"
          onClick={() => {
            modalProps?.acceptFunction!();
            if (prevName) setModalName(prevName);
            else setModalName(null);
          }}
        >
          Yes
        </button>
        <button
          className="bg-white w-1/2 text-[#404040] rounded-[20px] py-1.5 text-base cursor-pointer"
          onClick={() => {
            if (prevName) setModalName(prevName);
            else setModalName(null);
          }}
        >
          No
        </button>
      </div>
    </>
  );
}
