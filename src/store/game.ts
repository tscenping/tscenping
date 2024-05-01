import { GameInviteType, GameMatchType } from "types/GameTypes";
import { create } from "zustand";

export const useGameInviteState = create<GameInviteType>((set) => ({
  invitationId: -1,
  invitingUserNickname: "",
  gameType: "NORMAL_INVITE",
  setGameInviteState: (gameInvite: GameInviteType) => set({ ...gameInvite }),
}));

export const useGameMatchState = create<GameMatchType>((set) => ({
  isAccepted: false,
  gameId: -1,
  setGameMatchState: (gameMatch: GameMatchType) => set({ ...gameMatch }),
}));

// export const useModalState = create<useModalStateProps>((set, get) => ({
//   modalName: null,
//   prevName: null,
//   modalProps: null,
//   setModalName: (modalName) => {
//     const prevModalName = get().modalName;
//     set(() => ({
//       modalName,
//       prevName: prevModalName,
//     }));
//   },
//   setModalProps: (modalProps) => set({ modalProps }),
// }));

// export const useNoticeModalState = create<useNoticeModalStateProps>((set) => ({
//   content: "",
//   setContent: (content) => set({ content }),
// }));

// export const useCreateChatModeState = create<useCreateChatModeProps>((set) => ({
//   createChatType: "",
//   setCreateChatType: (createChatType) => set({ createChatType }),
// }));
