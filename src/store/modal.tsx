import { create } from "zustand";
import { useModalStateProps } from "../types/modalTypes";

export const useModalState = create<useModalStateProps>((set) => ({
  modalName: null,
  setModalName: (modalName) => set({ modalName }),
}));
