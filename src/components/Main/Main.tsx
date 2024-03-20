import { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <main className="min-w-[280px] max-w-[720px] w-full overflow-x-scroll scrollbar-hide mb-[70px] min-h-[667px]">
      {children}
    </main>
  );
};

export default Main;
