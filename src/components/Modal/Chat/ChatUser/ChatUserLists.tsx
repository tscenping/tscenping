import lock from "img/Chatting/lock.svg";
import unlock from "img/Chatting/unlock.svg";
import password from "img/Chatting/toggle.svg";
import open from "img/Chatting/open.svg";
import exitChat from "img/Chatting/out.svg";
import { useChat, useChatSetting } from "store/chat";
import { useModalState, useNoticeModalState } from "store/modal";
import useAxios from "hooks/useAxios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ChatUserList from "./ChatUserList";
import { useInviteMode, useMessage } from "store/chat";
import { useMyData } from "store/profile";
import { initializeApp } from "firebase/app";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  getFirestore,
} from "firebase/firestore/lite";

const ChatUserLists = (): JSX.Element => {
  const instance = useAxios();
  const { inChatInfo, setInChatInfo, setEmptyInChatInfo } = useChat();
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();
  const queryClient = useQueryClient();
  const { setContent } = useNoticeModalState();
  const { setMode } = useInviteMode();
  const { setParseChatLog, chatLog } = useMessage();
  const { myData } = useMyData();

  const deleteMessageData = async () => {
    try {
      if (myData.nickname) {
        const firebaseConfig = {
          projectId: "tscenping",
        };
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const messagesCol = collection(db, myData.nickname);
        const q = query(
          messagesCol,
          where("channelId", "==", inChatInfo.inChat)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const exitChatHandler = async () => {
    try {
      const response = await instance.patch("/channels/exit", {
        channelId: inChatInfo.inChat,
      });
      if (response.status === 200) {
        setModalName(null);
        const parseChatLog = chatLog.filter((message) => {
          return message.channelId !== inChatInfo.inChat;
        });
        deleteMessageData();
        setParseChatLog(parseChatLog);
        setEmptyInChatInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation({
    mutationFn: exitChatHandler,
    onSuccess: () => {
      if (
        inChatInfo.channelType === "PUBLIC" ||
        inChatInfo.channelType === "PROTECTED"
      )
        queryClient.invalidateQueries({ queryKey: ["open-password"] });
      else queryClient.invalidateQueries({ queryKey: ["group-dm"] });
    },
  });

  //비밀번호 채팅방 일반 채팅으로 바꾸는 api
  const changeOpenChatApiHandler = async () => {
    try {
      const response = await instance.patch("/channels/password", {
        channelId: inChatInfo.inChat,
        password: null,
      });
      if (response.status === 200) {
        setInChatInfo({ ...inChatInfo, channelType: "PUBLIC" });
        setContent("일반 채팅으로 변경되었어요.");
        setModalName("notice");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //비밀번호 채팅방 일반 채팅으로 바꾸는 api

  const changeMutate = useMutation({
    mutationFn: changeOpenChatApiHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["open-password"] });
    },
  });

  return (
    <section className="pl-6 pt-14 pb-10 text-base md:font-lg font-[Pretendard-SemiBold] flex flex-col justify-between h-full">
      <section>
        <header className="pb-10">채팅 상대</header>
        <ul className="pr-5">
          {inChatInfo.chatUsers &&
            inChatInfo.chatUsers.map((el) => (
              <ChatUserList
                key={el.channelUserId}
                channelUserId={el.channelUserId}
                userId={el.userId}
                nickname={el.nickname}
                avatar={el.avatar}
                isFriend={el.isFriend}
                isBlocked={el.isBlocked}
                channelUserType={el.channelUserType}
                myChannelUserType={inChatInfo.myChannelUserType}
              />
            ))}
        </ul>
      </section>
      <section className="pt-5 pr-5">
        <h1 className="font-[Pretendard-SemiBold] text-base sm:text-lg lg:text-xl xl:text-3xl pb-5 sm:pb-7 lg:pb-9 xl:pb-11">
          채팅방 설정
        </h1>
        <ul>
          {inChatInfo.myChannelUserType === "OWNER" &&
            inChatInfo.channelType !== "DM" &&
            inChatInfo.channelType !== "PRIVATE" && (
              <li
                className="cursor-pointer mb-5 sm:mb-7 lg:mb-9 xl:mb-11 flex justify-between "
                onClick={() => {
                  if (inChatInfo.channelType === "PROTECTED") {
                    setModalName("chatSetting");
                    setChatSetting(
                      inChatInfo.chatTitle,
                      "채팅방을 일반 채팅으로 변경하시겠어요?",
                      "변경하기",
                      () => {
                        changeMutate.mutate();
                      }
                    );
                  }
                  if (inChatInfo.channelType === "PUBLIC") {
                    setModalName("chatSetting");
                    setChatSetting(
                      inChatInfo.chatTitle,
                      "채팅방을 비밀 채팅으로 변경하시겠어요?",
                      "변경하기",
                      () => setModalName("changeChatPassword")
                    );
                  }
                }}
              >
                <span className="text-sm  sm:text-base lg:text-lg xl:text-2xl">
                  채팅 모드 변경
                </span>
                <section className="flex items-end">
                  <img
                    src={inChatInfo.channelType === "PROTECTED" ? lock : unlock}
                    className="cursor-pointer w-4"
                    alt="Change chat mode password"
                  />
                  <img
                    src={
                      inChatInfo.channelType === "PROTECTED" ? password : open
                    }
                    className="ml-4 cursor-pointer w-6"
                    alt="Change chat mode"
                  />
                </section>
              </li>
            )}
          {inChatInfo.myChannelUserType === "OWNER" &&
            inChatInfo.channelType === "PROTECTED" && (
              <li
                className="cursor-pointer text-sm mb-5 sm:mb-7 lg:mb-9 xl:mb-11 sm:text-base lg:text-lg xl:text-2xl"
                onClick={() => {
                  setModalName("changeChatPassword");
                }}
              >
                비밀번호 변경
              </li>
            )}
          {inChatInfo.myChannelUserType === "OWNER" &&
            inChatInfo.channelType === "PRIVATE" && (
              <li
                className="cursor-pointer text-sm mb-5 sm:mb-7 lg:mb-9 xl:mb-11 sm:text-base lg:text-lg xl:text-2xl"
                onClick={() => {
                  setMode(true);
                  setModalName(null);
                }}
              >
                채팅방 초대하기
              </li>
            )}
          <li
            className="flex justify-between items-center cursor-pointer"
            onClick={() => {
              setChatSetting(
                inChatInfo.chatTitle,
                "채팅방에서 나가시겠어요?",
                "나가기",
                () => {
                  mutate();
                }
              );
              setModalName("chatSetting");
            }}
          >
            <span className="text-sm cursor-pointer sm:text-base lg:text-lg xl:text-2xl">
              채팅방 나가기
            </span>
            <img src={exitChat} className="w-6 sm:w-7 md:w-8 lg:w-9" />
          </li>
        </ul>
      </section>
    </section>
  );
};

export default ChatUserLists;
