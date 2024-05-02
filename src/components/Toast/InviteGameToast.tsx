import { instance } from "components/Util/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameInviteState } from "store/game";
import { useToastState } from "store/toast";
import { GameInviteType } from "types/GameTypes";

const viewTime = 10000;
const duration = 500;

export default function InviteGameToast() {
  const { inviteType, setGameInviteState } =
    useGameInviteState();
  const { setToastState } = useToastState();
  // const [viewToast, setViewToast] = useState(true);
  const navigate = useNavigate();
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (inviteType.invitationId === -1) return;
    const timer = setTimeout(() => {
      setGameInviteState({
        invitationId: -1,
        invitingUserNickname: "",
        gameType: "NORMAL_INVITE",
      });
    }, viewTime);
    return () => {
      clearTimeout(timer);
    };
  }, [inviteType.invitationId]);

  useEffect(() => {
    console.log("invite toast");

    const timeout = setTimeout(() => {
      if (timeOutId !== null) {
        console.log("game invite auto decline");
        declineGameInvite();
      }
      // setViewToast(false);
      setToastState(null);
      setGameInviteState({
        invitationId: -1,
        invitingUserNickname: "",
        gameType: "NORMAL_INVITE",
      });
      // setIsVisible(false);
    }, viewTime - duration);

    setTimeOutId(timeout);

    return () => {
      console.log(timeOutId, "timeoutId");
      clearTimeout(timeOutId!);
      setTimeOutId(null);
    };
  }, []);

  const acceptGameInvite = async () => {
    await instance
      .post("game/accept", { gameInvitationId: inviteType.invitationId })
      .then((res) => {
        setGameInviteState({
          invitationId: -1,
          invitingUserNickname: "",
          gameType: "NORMAL_INVITE",
        });
        navigate("/game");
        console.log("invite accept");
      });

    clearTimeout(timeOutId!);
    setTimeOutId(null);
    // setIsVisible(false);
    setGameInviteState({
      invitationId: -1,
      invitingUserNickname: "",
      gameType: "NORMAL_INVITE",
    });
    setToastState(null);
    // setViewToast(false);
  };

  const declineGameInvite = async () => {
    await instance.delete(`/game/refuse/${inviteType.invitationId}`).then((res) => {
      console.log("invite decline");
    });

    clearTimeout(timeOutId!);
    setTimeOutId(null);
    // setIsVisible(false);
    setGameInviteState({
      invitationId: -1,
      invitingUserNickname: "",
      gameType: "NORMAL_INVITE",

    });
    setToastState(null);
    // setViewToast(false);
  };

  useEffect(() => {
    console.log("invitationId222", inviteType.invitationId);
  });

  return (
    <>
      {inviteType.invitationId !== -1 && (
        <>
          <p className="text-black text-Body">
            {inviteType.invitingUserNickname} 님의{" "}
            {inviteType.gameType === "NORMAL_INVITE" ? "노말 게임" : "스페셜 게임"} 초대를
            수락하시겠습니까?
          </p>
          <button onClick={acceptGameInvite}>수락</button>
          <button onClick={declineGameInvite}>거절</button>
        </>
      )}
    </>
  );
}
