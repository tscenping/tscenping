import { UserStatusType } from "./UserTypes";

export interface FriendUserInfo {
  id: number;
  nickname: string;
  avatar: string;
  status: UserStatusType;
  isBlocked: boolean;
  isFriend: boolean;
}

export interface FriendUserInfoType {
  id: number;
  nickname: string;
  avatar: string;
  status: UserStatusType;
  isBlocked: boolean;
  isFriend: boolean;
}

export type editType =
  | "ADDFRIEND"
  | "DELELEFRIEND"
  | "ADDBLOCK"
  | "DELETEBLOCK"
  | "";

export interface useSearchUserProps {
  searchUser: FriendUserInfo;
  setSearchUser: (v: FriendUserInfo | undefined) => void;
  setEditUserRelation: (v: editType) => void;
}
