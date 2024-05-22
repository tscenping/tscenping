import { ChatType } from "./ChatTypes";

export type ModalTypes =
  | "createChatMode"
  | "createChatInfo"
  | "notice"
  | "profile"
  | "loding"
  | "confirm"
  | "chatUserList"
  | "chatSetting"
  | "passwordChatJoin"
  | "channelJoin"
  | "changeChatPassword"
  | "setting"
  | "gameInvite"
  | "matchEnd"
  | "gameInviting"
  | null;
export type confirmTypes = "friend" | "block" | "chat" | "game" | "";
export interface ModalProps {
  confirmType?: confirmTypes;
  confirmMsg?: string;
  nickname?: string;
  isFriend?: boolean;
  isBlocked?: boolean;
  id?: number;
  acceptFunction?: () => Promise<void> | void;
  declineFunction?: () => void;
  mutate?: () => void;
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
  createChatType: ChatType;
  setCreateChatType: (createChatType: ChatType) => void;
}
