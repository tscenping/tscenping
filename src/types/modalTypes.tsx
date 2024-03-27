export interface useModalStateProps {
  modalName?: "createChat" | null;
  setModalName: (modalName: "createChat" | null) => void;
}
