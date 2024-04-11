import Container from "../components/Util/Container";
import MyProfilePage from "../components/Profile/MyProfilePage";
import UserProfilePage from "../components/Profile/UserProfilePage";
import { useUserProfileState } from "../store/profile";

interface UserProfileState {
  username?: string;
}

export default function Profile() {
  // const { userProfileState, setProfile } = useUserProfileState();

  return (
    // <Container>
      {/* {userProfileState?.username === undefined ? (
        <MyProfilePage />
      ) : (
        <UserProfilePage username={userProfileState.username} />
      )} */}
    // </Container>
  );
}
