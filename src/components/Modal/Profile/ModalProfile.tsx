import { useModalState } from "../../../store/modal";
import UserProfilePage from "../../Profile/UserProfilePage";
import ModalHeader from "../ModalHeader";

export default function ModalProfile() {
  const { modalProps } = useModalState();
  return (
    <div className="flex flex-col w-full h-screen-90">
      <ModalHeader title="Profile" />
      <UserProfilePage nickname={modalProps?.nickname} />
    </div>
  );
}
