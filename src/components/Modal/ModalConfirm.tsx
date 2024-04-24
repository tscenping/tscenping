import { useModalState } from "../../store/modal";

export default function ModalConfirm() {
  const { prevName, setModalName, modalProps } = useModalState();
  return (
    <div className="flex flex-col w-full h-full gap-10 p-5">
      <pre className="text-xl">{modalProps?.confirmMsg}</pre>
      <div className="flex flex-row gap-5 cursor-pointer">
        <button
          className="rounded-[12px] w-1/2 bg-customGreen min-h-[40px]  
          text-black min-w-[100px] font-bold hover:scale-105 cursor-pointer"
          onClick={() => {
            modalProps?.acceptFunction!();
            if (prevName) setModalName(prevName);
            else setModalName(null);
          }}
        >
          Yes
        </button>
        <button
          className="rounded-[12px] w-1/2 bg-[#FFFFFF] min-h-[40px]
          text-black min-w-[100px] font-bold hover:scale-105 cursor-pointer"
          onClick={() => {
            if (prevName) setModalName(prevName);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
