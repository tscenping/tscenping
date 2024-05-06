import backFriends from "img/Friends/backUsers.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import BlockUser from "./BlockUser";
import useGetUsers from "hooks/useApiFunction/useGetUsers";
import { channelSocket } from "socket/ChannelSocket";
import { useEffect } from "react";

interface BlockUsersProps {
  setPageSection: (v: string) => void;
}

interface BlockUserProps {
  nickname: string;
  avatar: string;
  id: number;
  status: "ONLINE" | "OFFLINE" | "NONE";
}

const BlockUsers = (props: BlockUsersProps): JSX.Element => {
  const { data, fetchNextPage, hasNextPage } = useGetUsers("BLOCK");

  return (
    <>
      <section className="p-5 w-full h-full">
        <section className="relative flex justify-center items-center">
          <img
            src={backFriends}
            alt="go back friend users icon"
            className="absolute left-0 cursor-pointer w-2 md:w-3"
            onClick={() => {
              props.setPageSection("friend");
            }}
          />
          <h1 className="p-[8px] font-[Pretendard-Bold] md:text-2xl text-base">
            차단한 친구
          </h1>
        </section>
        <section className="flex flex-col">
          <section className="flex justify-between py-[16px]"></section>
          <section>
            <ul className="flex flex-col w-full" id="ul">
              <InfiniteScroll
                next={fetchNextPage}
                hasMore={hasNextPage}
                dataLength={
                  data?.pages.reduce(
                    (total, page) => total + page.blocks.length,
                    0
                  ) || 0
                }
                loader={<></>}
                scrollableTarget="ul"
              >
                {data?.pages.map((page) =>
                  page.blocks?.map((el: BlockUserProps) => (
                    <BlockUser
                      key={el.id}
                      nickname={el.nickname}
                      avatar={el.avatar}
                      id={el.id}
                      status={el.status}
                    />
                  ))
                )}
              </InfiniteScroll>
            </ul>
          </section>
        </section>
      </section>
    </>
  );
};

export default BlockUsers;
