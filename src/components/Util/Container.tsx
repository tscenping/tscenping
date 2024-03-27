import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ModalContainer from "./ModalContainer";
import { useModalState } from "../../store/modal";

export default function Container({ children }: { children: ReactNode }) {
  const { modalName } = useModalState();
  return (
    <div className="relative flex flex-col items-center justify-center max-w-4xl min-w-[280px] mx-auto p-4 bg-defaultBg h-screen text-sm sm:text-base min-h-[660px] md:text-lg lg:text-xl xl:text-2xl font-['Pretendard'] text-white overflow-hidden">
      {modalName && <ModalContainer />}
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
