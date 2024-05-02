import { ReactNode, useEffect, useState } from "react";
import Footer from "components/Footer/Footer";
import ModalContainer from "./ModalContainer";
import { useModalState } from "../../store/modal";
import Main from "./Main";
import { useBlocks } from "store/friend";
import useAxios from "hooks/useAxios";
import { useMyData } from "store/profile";

import InviteGameToast from "../Toast/InviteGameToast";
import ChannelSocketHandler from "components/Socket/ChannelSocketHandler";
import { useGameInviteState } from "store/game";
import { useInviteChat } from "store/chat";
import ToastHandler from "components/Toast/ToastHandler";

export default function Container({ children }: { children: ReactNode }) {
  const { modalName } = useModalState();
  const { inviteType } = useGameInviteState();
  const [viewToast, setViewToast] = useState(false);
  const { setBlockUsers, blockUsers } = useBlocks();
  const instance = useAxios();
  const { myData } = useMyData();
  const { inviteChatInfo } = useInviteChat();

  const blockUsersApiHandler = async () => {
    try {
      const response = await instance.get("/users/blocks");
      if (response.status === 200) setBlockUsers(response.data.blocks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!blockUsers && myData.nickname) blockUsersApiHandler();
  }, []);

  useEffect(() => {
    // console.log("invitationId", inviteType.invitationId);
  }, [inviteType.invitationId]);

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
      {(inviteType.invitationId !== -1 ||
        inviteChatInfo.inviteChatId !== -1) && <ToastHandler />}
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
