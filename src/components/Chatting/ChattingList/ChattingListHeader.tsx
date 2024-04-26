import { useState, useEffect } from "react";
import { useModalState } from "store/modal";
import { useLocation } from "react-router-dom";
import createChatting from "img/InChatting/createChatting.svg";
import listRefresh from "img/Chatting/listRefresh.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ChattingListHeader = (): JSX.Element => {
  const location = useLocation();
  const pathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const { setModalName } = useModalState();
  const queryClient = useQueryClient();

  const [refreshDisabled, setRefreshDisabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRefreshDisabled(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const refreshListApiHandler = () => {
    if (pathName === "inchatting") {
      queryClient.invalidateQueries({
        queryKey: ["group-dm"],
      });
    }
    if (pathName === "chatting") {
      queryClient.invalidateQueries({
        queryKey: ["open-password"],
      });
    }
    setRefreshDisabled(true);
    setTimeout(() => {
      setRefreshDisabled(false);
    }, 10000);
  };

  return (
    <section className="px-4 py-7">
      <section className="flex w-full justify-between items-center">
        <span className="text-[20px] font-bold md:text-[24px]">
          {pathName === "inchatting" ? "참여중인 전체 채팅방" : "오픈 채팅방"}
        </span>
        <section className="flex">
          <img
            src={listRefresh}
            alt="chat list refresh"
            className={`w-10 mr-5 cursor-pointer ${
              refreshDisabled ? "opacity-50" : ""
            }`}
            onClick={refreshListApiHandler}
          />
          <img
            src={createChatting}
            alt="create chatting room"
            className="w-10 cursor-pointer"
            onClick={() => setModalName("createChatMode")}
          />
        </section>
      </section>
    </section>
  );
};

export default ChattingListHeader;
