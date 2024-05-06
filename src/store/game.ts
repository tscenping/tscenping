import {
  GameInviteType,
  GameMatchType,
  InviteInType,
  useMatchSerch,
  useMatchSerchProps,
} from "types/GameTypes";
import { create } from "zustand";

export const useGameInviteState = create<GameInviteType>((set) => ({
  inviteType: {
    invitationId: -1,
    invitingUserNickname: "",
    gameType: "NORMAL_INVITE",
  },
  setGameInviteState: (gameInvite: InviteInType) =>
    set({ inviteType: gameInvite }),
}));

export const useGameMatchState = create<GameMatchType>((set) => ({
  isAccepted: false,
  gameId: -1,
  setGameMatchState: (gameMatch: GameMatchType) => set({ ...gameMatch }),
}));


export const useMatchSerchState = create<useMatchSerch>((set) => ({
  matchSerchProps: null,
  setMatchSerchState: (matchSerchState: useMatchSerchProps | null) =>
    set({ matchSerchProps: matchSerchState }),
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
