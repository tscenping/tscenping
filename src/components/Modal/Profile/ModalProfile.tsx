import { useModalState } from "../../../store/modal";
import { useMyProfileState, useUserProfileState } from "../../../store/profile";
import MyProfilePage from "../../Profile/MyProfilePage";
import UserProfilePage from "../../Profile/UserProfilePage";
import Container from "../../Util/Container";
import ModalHeader from "../ModalHeader";

export default function ModalProfile() {
  const { modalProps } = useModalState();
  const { myProfileState } = useMyProfileState();

  return (
    <div className="flex flex-col w-full h-screen-90">
      <ModalHeader title="Profile" />
      {modalProps?.nickname === myProfileState?.nickname ? (
        <MyProfilePage />
      ) : (
        <UserProfilePage username={modalProps?.nickname} />
      )}
    </div>
  );
}
