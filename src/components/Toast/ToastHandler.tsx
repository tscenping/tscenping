import { useToastState } from "store/toast";
import InviteGameToast from "./InviteGameToast";
import { useEffect, useState } from "react";
import InviteChatToast from "./InviteChatToast";

const viewTime = 10000;
const duration = 500;

export default function ToastHandler() {
  const { toastName} = useToastState();
  const [isVisible, setIsVisible] = useState(false);
  const toastContent: { [key: string]: JSX.Element | null } = {
    game: <InviteGameToast />,
    chat: <InviteChatToast />,
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
      //eslint-disable-next-line react-hooks/exhaustive-deps
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastName]);

  return (
    toastName && (
      <div
        className={`border-[2px] border-solid border-customGreen absolute mt-3 text-center bg-[#2d2d2d] opacity-0 transition-all text-white duration-${duration} transform w-1/2 rounded-[10px] z-30 px-5 py-2 ${
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
