import { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }): JSX.Element => {
  return <main className="min-w-[280px] max-w-[720px] w-full">{children}</main>;
};

export default Main;
