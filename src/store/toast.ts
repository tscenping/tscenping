import { create } from "zustand";
interface GameInvitationType {
  gameId: number;
  invitingNickname: string;
}

interface ChatInvitationType {}

interface NotiType {}

type ToastType = "game" | "chat" | "noti" | null;

interface ToastState {
  toastName: ToastType;
  gameProp?: GameInvitationType;
  chatProp?: ChatInvitationType;
  notiProp?: NotiType;
  setToastState: (
    toastName: ToastType,
    gameProp?: GameInvitationType,
    chatProp?: ChatInvitationType,
    notiProp?: NotiType
  ) => void;
}

export const useToastState = create<ToastState>((set) => ({
  toastName: null,
  setToastState: (toastName, gameProp, chatProp, notiProp) =>
    set({ toastName, gameProp, chatProp, notiProp }),
}));
