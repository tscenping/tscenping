import { create } from "zustand";
import {
  useModalStateProps,
  useNoticeModalStateProps,
} from "../types/ModalTypes";

export const useModalState = create<useModalStateProps>((set, get) => ({
  modalName: null,
  prevName: null,
  modalProps: null,
  setModalName: (modalName) => {
    const prevModalName = get().modalName;
    set(() => ({
      modalName,
      prevName: prevModalName,
    }));
  },
  setModalProps: (modalProps) => set({ modalProps }),
}));

export const useNoticeModalState = create<useNoticeModalStateProps>((set) => ({
  content: "",
  setContent: (content) => set({ content }),
}));
