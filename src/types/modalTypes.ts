export interface useModalStateProps {
  modalName?: "createChatMode" | "createChatInfo" | "notice" | null;
  setModalName: (
    modalName: "createChatMode" | "createChatInfo" | "notice" | null
  ) => void;
}

export interface useNoticeModalStateProps {
  content: string;
  setContent: (v: string) => void;
}
