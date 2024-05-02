import { useToastState } from "store/toast";
import InviteGameToast from "./InviteGameToast";
import { useEffect, useState } from "react";

const viewTime = 10000;
const duration = 500;

export default function ToastHandler() {
  const { toastName, setToastState } = useToastState();
  const [isVisible, setIsVisible] = useState(false);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout | null>(null);
  const toastContent: { [key: string]: JSX.Element | null } = {
    game: <InviteGameToast />,
  };

  let timeout: NodeJS.Timeout;

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setToastState(null);
  //     setIsVisible(false);
  //   }, viewTime - duration);
  //   setTimeOutId(timeout);
  //   return () => {
  //     clearTimeout(timeOutId!);
  //   };
  // });

  useEffect(() => {
    if (toastName === null) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
      timeout = setTimeout(() => {
        // setToastState(null);
        setIsVisible(false);
      }, viewTime - duration - duration);
      // }, viewTime - duration - duration);
    }
    console.log("toastName", toastName);
    return () => {
      console.log("clearTimeout", timeout);
      clearTimeout(timeout);
    };
  }, [toastName]);

  return (
    toastName && (
      <div
        className={` absolute mt-3 text-center bg-green-50 opacity-0 transition-all text-black duration-${duration} transform w-1/2 rounded-[10px] z-30 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      >
        {toastContent[toastName]}
      </div>
    )
  );
}
