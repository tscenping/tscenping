import { create } from "zustand";
import {
  useModalStateProps,
  useNoticeModalStateProps,
  useCreateChatModeProps,
} from "../types/ModalTypes";
import { useMatchEndProps } from "types/GameTypes";

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

export const useCreateChatModeState = create<useCreateChatModeProps>((set) => ({
  createChatType: "",
  setCreateChatType: (createChatType) => set({ createChatType }),
}));

export const useMatchEndState = create<useMatchEndProps>((set) => ({
  matchEndData: null,
  setMatchEndData: (matchEndData) => set({ matchEndData }),
}));
