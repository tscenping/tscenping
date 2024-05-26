import RecentMatchContent from "./RecentMatchContent";
import winIcon from "../../../img/Profile/Win.svg";
import loseIcon from "../../../img/Profile/Lose.svg";
import { useUserProfileState } from "../../../store/profile";
import React, { useEffect, useState } from "react";
import { instance } from "../../Util/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

interface GameHistory {
  rivalname: string;
  rivalavatar: string;
  rivalscore: number;
  myscore: number;
  iswinner: boolean;
}
interface RecentMatchData {
  gameHistories: GameHistory[];
  totalItemCount: number;
}

export default function RecentMatch() {
  const { userProfileState } = useUserProfileState();
  const { nickname, avatar } = userProfileState;
  const [matchData, setMatchData] = useState<RecentMatchData[]>();

  const fetchPage = async (page: unknown) => {
    if (!nickname) return;
    const response = await instance.get(
      `users/games/${nickname}/?page=${page}`
    );
    return response.data;
  };

  const {
    data,
    // isLoading,
    // isError,
    fetchNextPage,
    // isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["matchData", { nickname }],
    queryFn: ({ pageParam }) => fetchPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !allPages) return;
      const totalPages = Math.ceil(lastPage.totalItemCount / 5);
      return allPages.length < totalPages ? allPages.length + 1 : undefined;
    },
  });
  useEffect(() => {
    if (!data?.pages) return;
    setMatchData(data?.pages);
  }, [data]);

  return (
    <>
      <ul className="flex flex-col items-center h-2/3 w-full overflow-y-auto scrollbar-hide justify-start gap-3 p-5 rounded-2xl bg-[#3A3A3A] max-h-[500px]">
        <div className="flex flex-col items-center h-full w-full overflow-y-auto scrollbar-hide justify-start gap-3  rounded-2xl bg-[#3B3B3B]">
          {matchData !== undefined &&
            (matchData[0]?.totalItemCount > 0 ? (
              matchData.map((dataChunk, index) => (
                <React.Fragment key={index}>
                  {dataChunk !== undefined &&
                    dataChunk.gameHistories.map((data, i) => (
                      <RecentMatchContent
                        leftname={nickname}
                        leftavatar={avatar}
                        leftscore={data.myscore}
                        rightname={data.rivalname}
                        rightscore={data.rivalscore}
                        rightavatar={data.rivalavatar}
                        // isWinner={data.isWinner}
                        key={`${data.rivalname}${i} `}
                      />
                    ))}
                </React.Fragment>
              ))
            ) : (
              <p className="flex items-center justify-center h-full">
                전적이 없습니다.
              </p>
            ))}
          {hasNextPage && (
            <button
              onClick={() => {
                fetchNextPage();
              }}
            >
              더 보기
            </button>
          )}
        </div>
      </ul>
      <section className="flex items-center justify-start gap-5 font-extrabold">
        <div className="flex items-center justify-center gap-2">
          <img src={winIcon} alt="loseIcon" className="" width={12} />
          <p>Win</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img src={loseIcon} alt="loseIcon" className="" width={12} />
          <p>Lose</p>
        </div>
      </section>
    </>
  );
}
