import { create } from "zustand";

interface UserProfileState {
  username?: string;
}

interface UserProfile {
  userProfileState?: UserProfileState;
  setProfile: (userState: UserProfileState) => void;
}

export const useUserProfileState = create<UserProfile>((set) => ({
  userProfileState: {
    username: "zxc",
  },
  setProfile: (userProfileState: UserProfileState) => set({ userProfileState }),
}));
