import { instance } from "components/Util/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameInviteState } from "store/game";
import { GameInviteType } from "types/GameTypes";

const viewTime = 10000;
const duration = 500;

export default function InviteGameToast({setViewToast}:{setViewToast:Function}) {
  const { invitationId, invitingUserNickname, gameType, setGameInviteState } =
    useGameInviteState();
  const navigate = useNavigate();
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (invitationId === -1) return;
    const timer = setTimeout(() => {
      setGameInviteState({
        invitationId: -1,
        invitingUserNickname: "",
        gameType: "NORMAL_GAME",
        setGameInviteState: () => {},
      });
    }, viewTime);
    return () => {
      clearTimeout(timer);
    };
  }, [invitationId]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    console.log("invite toast");

    const timeout = setTimeout(() => {
      if (timeOutId !== null) {
        console.log("game invite auto decline");
        declineGameInvite();
      }
      setViewToast(false);
      setGameInviteState({ invitationId: -1, invitingUserNickname: "", gameType: "NORMAL_GAME", setGameInviteState: () => {} })
      setIsVisible(false);
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
      .post("game/accept", { gameInvitationId: invitationId })
      .then((res) => {
        navigate("/game");
        console.log("invite accept");
      });

    clearTimeout(timeOutId!);
    setTimeOutId(null);
    setIsVisible(false);
    setGameInviteState({ invitationId: -1, invitingUserNickname: "", gameType: "NORMAL_GAME", setGameInviteState: () => {} })
    setViewToast(false);
  };

  const declineGameInvite = async () => {
    await instance.delete(`/game/refuse/${invitationId}`).then((res) => {
      console.log("invite decline");
    });

    clearTimeout(timeOutId!);
    setTimeOutId(null);
    setIsVisible(false);
    setGameInviteState({ invitationId: -1, invitingUserNickname: "", gameType: "NORMAL_GAME", setGameInviteState: () => {} })
    setViewToast(false);
  };

  return (
    <div
      className={` absolute mt-3 text-center bg-green-50 opacity-0 transition-all text-black duration-${duration} transform w-1/2 rounded-[10px] z-30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <p className="text-black text-Body">
        {invitingUserNickname} 님의{" "}
        {gameType === "NORMAL_GAME" ? "노말 게임" : "스페셜 게임"} 초대를
        수락하시겠습니까?
      </p>
      <button onClick={acceptGameInvite}>수락</button>
      <button onClick={declineGameInvite}>거절</button>
    </div>
  );
}
