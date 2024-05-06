import { create } from "zustand";
import {
  FriendUserInfoType,
  useSearchUserProps,
  editType,
  useBlocksProps,
} from "types/FriendTypes";

export const useSearchUser = create<useSearchUserProps>((set) => ({
  searchUser: {
    nickname: "",
    avatar: "",
    id: 0,
    status: "",
    isBlocked: false,
    isFriend: false,
  },

  setSearchUser: (searchUser: FriendUserInfoType | undefined) =>
    set({ searchUser }),
  setEditUserRelation: (editType: editType) => {
    if (editType === "ADDFRIEND")
      set((prevState) => ({
        ...prevState,
        searchUser: {
          ...prevState.searchUser,
          isFriend: true,
          isBlocked: false,
        },
      }));
    if (editType === "DELELEFRIEND")
      set((prevState) => ({
        ...prevState,
        searchUser: {
          ...prevState.searchUser,
          isFriend: false,
        },
      }));
    if (editType === "ADDBLOCK")
      set((prevState) => ({
        ...prevState,
        searchUser: {
          ...prevState.searchUser,
          isFriend: false,
          isBlocked: true,
        },
      }));
    if (editType === "DELETEBLOCK")
      set((prevState) => ({
        ...prevState,
        searchUser: {
          ...prevState.searchUser,
          isBlocked: false,
        },
      }));
  },
}));

export const useBlocks = create<useBlocksProps>((set) => ({
  setBlockUsers: (blockUsers) => set({ blockUsers }),
}));
