import { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }): JSX.Element => {
  return <main className="min-w-[480px] max-w-[720px]">{children}</main>;
};

export default Main;
