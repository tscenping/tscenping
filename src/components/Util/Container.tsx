import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col items-center justify-center max-w-4xl min-w-[280px] mx-auto p-4 bg-defaultBg h-screen text-sm sm:text-base min-h-[660px] md:text-lg lg:text-xl xl:text-2xl font-['Pretendard'] text-white">
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
