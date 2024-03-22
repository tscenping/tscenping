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
      ? "absolute top-0"
      : "";

  return (
    <main className={`min-w-[280px] max-w-[720px] w-full ${headerImportStyle}`}>
      {children}
    </main>
  );
};

export default Main;
