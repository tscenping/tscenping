export type ModalTypes =
  | "createChatMode"
  | "createChatInfo"
  | "notice"
  | "profile"
  | "loding"
  | "confirm"
  | "chatUserList"
  | null;
export type confirmTypes = "friend" | "block" | "chat" | "game" | "";
export interface ModalProps {
  confirmType?: confirmTypes;
  nickname?: string;
}

export interface useModalStateProps {
  modalName?: ModalTypes;
  prevName?: ModalTypes;
  modalProps?: ModalProps | null;
  setModalName: (modalName: ModalTypes) => void;
  setModalProps: (modalProps: ModalProps) => void;
}

export interface useNoticeModalStateProps {
  content: string;
  setContent: (v: string) => void;
}

export interface useCreateChatModeProps {
  createChatType?: "PROTECTED" | "PUBLIC" | null;
  setCreateChatType: (createChatType: "PROTECTED" | "PUBLIC" | null) => void;
}
