import useAxios from "hooks/useAxios";
import { useEffect } from "react";
import { useInviteChat, useChat } from "store/chat";
import { useToastState } from "store/toast";
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  Firestore,
} from "firebase/firestore/lite";
import firebaseSetting from "func/settingFirebase";

const InviteChatToast = (): JSX.Element => {
  const { inviteChatInfo, setInviteChatInfo } = useInviteChat();
  const { setToastState } = useToastState();
  const { setInChatInfo, inChatInfo } = useChat();
  const instance = useAxios();
  const { db } = firebaseSetting();

  useEffect(() => {
    if (inviteChatInfo.inviteChatId === -1) return;
    const timerChatInvite = setTimeout(() => {
      setInviteChatInfo({
        inviteChatId: -1,
        inviteChatUserNickname: "",
      });
    }, 10000);
    return () => {
      clearTimeout(timerChatInvite);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteChatInfo.inviteChatId]);

  async function getUserCount(db: Firestore, channelId: number) {
    const messagesCol = collection(db, "chat");
    const orderMessage = query(messagesCol);
    const messageSnapshot = await getDocs(orderMessage);
    const messageData = messageSnapshot.docs.find((doc) => {
      return doc.data().channelId === channelId;
    });
    return messageData?.data().userCount;
  }

  const acceptChatInvite = async () => {
    try {
      const response = await instance.post("/channels/accept", {
        invitationId: inviteChatInfo.inviteChatId,
      });
      if (response.status === 201) {
        const enterResponse = await instance.get(
          `/channels/enter/${response.data.channelId}`
        );
        if (enterResponse.status === 200) {
          setInChatInfo({
            ...inChatInfo,
            inChat: response.data.channelId,
            channelType: "PRIVATE",
            chatTitle: response.data.channelName,
            chatUsers: response.data.channelUsers,
            chatUsersCount: enterResponse.data.channelUsers.length,
            myChannelUserType: "MEMBER",
            isJoined: true,
          });
          const userCollectionRef = collection(db, "chat");
          const q = query(
            userCollectionRef,
            where("channelId", "==", response.data.channelId)
          );
          const querySnapshot = await getDocs(q);
          const result = (await getUserCount(db, response.data.channelId)) + 1;
          querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;
            await updateDoc(docRef, {
              userCount: result,
            });
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setInviteChatInfo({ inviteChatId: -1, inviteChatUserNickname: "" });
    setToastState(null);
  };

  const refuseChatInvite = async () => {
    await instance.delete(
      `/channels/refuse/${inviteChatInfo.inviteChatId}`
    );
    setInviteChatInfo({ inviteChatId: -1, inviteChatUserNickname: "" });
    setToastState(null);
  };

  return (
    <>
      {inviteChatInfo.inviteChatId !== -1 && (
        <>
          <p className="text-black text-Body font-[Pretendard]">
            <strong>{inviteChatInfo.inviteChatUserNickname}</strong> 님의 그룹방
            초대를 수락하시겠습니까?
          </p>
          <section className="flex w-full py-2 text-white justify-evenly">
            <button onClick={acceptChatInvite}>수락</button>
            <button onClick={refuseChatInvite}>거절</button>
          </section>
        </>
      )}
    </>
  );
};

export default InviteChatToast;
