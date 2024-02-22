import React, { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl min-w-[280px] mx-auto p-4 bg-defaultBg h-screen text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-['Pretendard'] text-white">
      {children}
    </div>
  );
}
