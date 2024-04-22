import { useEffect, useState } from "react";

export default function Toast({
  message,
  setToast,
  position,
}: {
  message: string;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
  position: "top" | "bottom";
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  

  return (
    <div
      className={` absolute mt-3 text-center bg-green-50 opacity-0 transition-all duration-500 transform w-1/2 rounded-[10px] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <p className="text-black text-Body">{message}</p>
      <button>수락</button>
      <button>거절</button>
    </div>
  );
}
