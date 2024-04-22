import { create } from "zustand";
interface GameInvitation {
  gameId: number,
  invitingNickname: string,
}

interface ToastState {
  message: string,
}

interface Toast {
  toastState: ToastState;
  setToastSTate: (toastState: ToastState) => void;
}



export const useToast = create((set) => ({
  toastState: {
    message: "",
    
  },
    setToastSTate: (toastState:ToastState) => set({ toastState }),
}));