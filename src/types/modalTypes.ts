export interface useModalStateProps {
  modalName?:
    | "createChatMode"
    | "createChatInfo"
    | "notice"
    | "chatUserList"
    | null;
  setModalName: (
    modalName:
      | "createChatMode"
      | "createChatInfo"
      | "notice"
      | "chatUserList"
      | null
  ) => void;
}

export interface useNoticeModalStateProps {
  content: string;
  setContent: (v: string) => void;
}

export interface useCreateChatModeProps {
  createChatType?: "PROTECTED" | "PUBLIC" | null;
  setCreateChatType: (createChatType: "PROTECTED" | "PUBLIC" | null) => void;
}
