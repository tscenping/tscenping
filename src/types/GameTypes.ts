export interface GameInviteType {
  invitationId: number;
  invitingUserNickname: string;
  gameType: "SPECIAL_INVITE" | "NORMAL_INVITE";
  setGameInviteState: (gameInvite: GameInviteType) => void;
}

export interface GameMatchType {
  isAccepted: boolean;
  gameId: number;
  setGameMatchState: (gameMatch: GameMatchType) => void;
}

export interface ObjectType {
  x: number;
  y: number;
}

export interface MatchEndType {
  gameType: "NORMAL" | "SPECIAL" | "LADDER" | "NONE" | null; // NONE은 얘기치 않은 종료 or무효 
  rivalScore: number;
  myScore: number;
  isWin: boolean;
  myLadderScore: number; //래더일 경우에만
  rivalLadderScore: number; //래더일 경우에만
  rivalName: string;
  rivalAvatar: string;
}

export interface MatchDataType {
  rivalNickname: string;
  rivalAvatar: string;
  myPosition: "LEFT" | "RIGHT";
  ball: ObjectType;
  myRacket: ObjectType;
  rivalRacke: ObjectType;
  // setMatchData: (matchData: MatchDataType) => void,
}

export interface useMatchEndProps{
  matchEndData: MatchEndType | null;
  setMatchEndData: (matchEndData: MatchEndType | null) => void;
}