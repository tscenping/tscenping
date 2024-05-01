import { ReactNode, useEffect, useState } from "react";
import Footer from "components/Footer/Footer";
import ModalContainer from "./ModalContainer";
import { useModalState } from "../../store/modal";
import Main from "./Main";
import InviteGameToast from "../Toast/InviteGameToast";
import ChannelSocketHandler from "components/Socket/ChannelSocketHandler";
import { useGameInviteState } from "store/game";
import ToastHandler from "components/Toast/ToastHandler";
export default function Container({ children }: { children: ReactNode }) {
  const { modalName } = useModalState();
  const { invitationId } = useGameInviteState();
  const [viewToast, setViewToast] = useState(false);

  useEffect(() => {
    if (invitationId !== -1) {
      setViewToast(true);
    }
  }, [invitationId]);

  return (
    <div className="relative flex flex-col items-center justify-between max-w-4xl min-w-[280px] mx-auto  bg-defaultBg h-screen text-sm sm:text-base min-h-[660px] md:text-lg lg:text-xl xl:text-2xl font-['Pretendard'] text-white ">
      {modalName && <ModalContainer />}

      <ChannelSocketHandler />
      {/* <button
        onClick={() => {
          setViewToast(true);
        }}
      >
        토스트
      </button> */}
      {/* {invitationId !== -1 && <InviteGameToast setViewToast={setViewToast} />} */}
      <ToastHandler />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
