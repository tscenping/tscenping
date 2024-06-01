import useAxios from "hooks/useAxios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameInviteState } from "store/game";
import { useToastState } from "store/toast";

const viewTime = 10000;
const duration = 500;

export default function InviteGameToast() {
  const { inviteType, setGameInviteState } = useGameInviteState();
  const { setToastState } = useToastState();
  const instance = useAxios();
  // const [viewToast, setViewToast] = useState(true);
  const navigate = useNavigate();
  let timeOut: NodeJS.Timeout;
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
      console.log("clearTimeout Game1");
      clearTimeout(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteType.invitationId]);

  useEffect(() => {
    console.log("invite toast");
    //eslint-disable-next-line react-hooks/exhaustive-deps
    timeOut = setTimeout(() => {
      if (timeOut !== null) {
        console.log("game invite auto decline");
        // declineGameInvite();
      }
      setToastState(null);
      setGameInviteState({
        invitationId: -1,
        invitingUserNickname: "",
        gameType: "NORMAL_INVITE",
      });
      // setIsVisible(false);
    }, viewTime - duration);

    return () => {
      console.log(timeOut, "timeoutId");
      clearTimeout(timeOut);
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

    clearTimeout(timeOut);
    // setTimeOutId(null);
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
    await instance
      .delete(`/game/refuse/${inviteType.invitationId}`)
      .then((res) => {
        console.log("invite decline");
      });

    clearTimeout(timeOut);
    // setTimeOutId(null);
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
          <p className="text-black text-Body font-[Pretendard]">
            <strong>{inviteType.invitingUserNickname}</strong> 님의{" "}
            <strong>
              {inviteType.gameType === "NORMAL_INVITE"
                ? "노말 게임"
                : "스페셜 게임"}
            </strong>
            초대를 수락하시겠습니까?
          </p>
          <section className="flex w-full py-2 text-white justify-evenly">
            <button onClick={acceptGameInvite}>수락</button>
            <button onClick={declineGameInvite}>거절</button>
          </section>
        </>
      )}
    </>
  );
}
