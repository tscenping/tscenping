import { create } from "zustand";
import {
  useModalStateProps,
  useNoticeModalStateProps,
  useCreateChatModeProps,
} from "../types/modalTypes";

export const useModalState = create<useModalStateProps>((set) => ({
  modalName: null,
  setModalName: (modalName) => set({ modalName }),
}));

export const useNoticeModalState = create<useNoticeModalStateProps>((set) => ({
  content: "",
  setContent: (content) => set({ content }),
}));

export const useCreateChatModeState = create<useCreateChatModeProps>((set) => ({
  createChatType: null,
  setCreateChatType: (createChatType) => set({ createChatType }),
}));
