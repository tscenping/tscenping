import { ReactNode } from "react";
import LoginCheck from "./LoginCheck";

const Main = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    // <main className="min-w-[280px] max-w-[720px] w-full overflow-x-scroll scrollbar-hide mb-[70px] min-h-[667px]">
    <main
      className={`min-w-[280px] h-full max-w-[720px] w-full min-h-[591px] overflow-hidden scrollbar-hide p-4 flex items-center justify-center`}
    >
      <div className="flex items-center justify-center w-full h-full">
        {/* <LoginCheck /> */}
        {children}
      </div>
    </main>
  );
};

export default Main;
