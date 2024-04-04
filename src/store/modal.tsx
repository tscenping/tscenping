import { create } from "zustand";
import {
  useModalStateProps,
  useNoticeModalStateProps,
} from "../types/modalTypes";

export const useModalState = create<useModalStateProps>((set) => ({
  modalName: null,
  setModalName: (modalName) => set({ modalName }),
}));

export const useNoticeModalState = create<useNoticeModalStateProps>((set) => ({
  content: "",
  setContent: (content) => set({ content }),
}));
