import { create } from "zustand";

interface ProfileState {
  id: number;
  nickname: string;
}
interface MyData {
  myData: ProfileState;
  setMyData: (myData: ProfileState) => void;
}
export const useMyData = create<MyData>((set) => ({
  myData: {
    id: -1,
    nickname: "",
  },
  setMyData: (myData: ProfileState) => set({ myData }),
}));

interface UserProfileState {
  nickname: string;
  id: number;
  avatar: string;
  statusMessage: string;
  loseCount: number;
  winCount: number;
  totalCount: number;
  ladderRank: number;
  ladderScore: number;
  ladderMaxScore: number;
  isFriend: boolean;
  isBlocked: boolean;
}

interface UserProfile {
  userProfileState: UserProfileState;
  setUserProfile: (userState: UserProfileState) => void;
}

export const useUserProfileState = create<UserProfile>((set) => ({
  userProfileState: {
    nickname: "",
    id: -1,
    avatar: "",
    statusMessage: "",
    loseCount: 0,
    winCount: 0,
    totalCount: 0,
    ladderRank: 0,
    ladderScore: 0,
    ladderMaxScore: 0,
    isFriend: false,
    isBlocked: false,
  },
  setUserProfile: (userProfileState: UserProfileState) =>
    set({ userProfileState }),
}));
