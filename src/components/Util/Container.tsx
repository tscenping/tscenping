import { ReactNode, useState } from "react";
import Footer from "../Footer/Footer";
// import Main from "../Main/Main";
import ModalContainer from "./ModalContainer";
import { useModalState } from "../../store/modal";
import Main from "./Main";
import Toast from "../Toast/Toast";

export default function Container({ children }: { children: ReactNode }) {
  const { modalName } = useModalState();
  const [viewToast, setViewToast] = useState(false);
  return (
    // <div className="relative flex flex-col items-center justify-center max-w-4xl min-w-[280px] mx-auto px-4 pt-4 bg-[#2D2D2D] h-screen text-sm sm:text-base min-h-[660px] md:text-lg lg:text-xl xl:text-2xl font-['Pretendard'] text-white overflow-scroll"></div>
    // <div className="relative flex flex-col items-center justify-center max-w-4xl min-w-[280px] mx-auto p-4 bg-[#2D2D2D] h-screen text-sm sm:text-base min-h-[660px] md:text-lg lg:text-xl xl:text-2xl font-['Pretendard'] text-white ">
    <div className="relative flex flex-col items-center justify-between max-w-4xl min-w-[280px] mx-auto  bg-defaultBg h-screen text-sm sm:text-base min-h-[660px] md:text-lg lg:text-xl xl:text-2xl font-['Pretendard'] text-white ">
      {modalName && <ModalContainer />}
      <button
        onClick={() => {
          setViewToast(true);
        }}
      >
        토스트
      </button>
      {viewToast && (
        <Toast message="테스트 완료" setToast={setViewToast} position="top" />
      )}
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
