import path from "path";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

const Main = ({ children }: { children: ReactNode }): JSX.Element => {
  const location = useLocation();
  const pathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const headerImportStyle =
    pathName === "friends" ||
    pathName === "inchatting" ||
    pathName === "chatting"
      ? "top-0"
      : "";

  return (
    // <main className="min-w-[280px] max-w-[720px] w-full overflow-x-scroll scrollbar-hide mb-[70px] min-h-[667px]">
    <main
      className={`min-w-[280px] h-full max-w-[720px] w-full min-h-[591px] overflow-hidden scrollbar-hide ${headerImportStyle} p-4 flex items-center justify-center`}
    >
      <div className="items-center justify-center w-full h-full ">
        {children}
      </div>
    </main>
  );
};

export default Main;
