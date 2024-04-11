import RankingContentItem from "../Main/Ranking/RankingContentItem";
import { chunkArray } from "../Main/Ranking/RankingList";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  // Navigation,
  // Scrollbar,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import { useEffect, useState } from "react";
import { instance } from "../Util/axios";
import { useQuery } from "@tanstack/react-query";

interface RankingDataChunk {
  avatar: string;
  ladderScore: number;
  nickname: string;
  ranking: number;
}
interface RankingDataType {
  rankUsers: RankingDataChunk[];
  totalItemCount: number;
}

export default function Ranking() {
  const [rankingData, setRankingData] = useState<RankingDataType>();
  const [rankingDataChunks, setRankingDataChunks] = useState<
    RankingDataChunk[][] | null
  >();

  const getRanking = async () => {
    try {
      const response = await instance.get(`users/rank`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["rankingData"],
    queryFn: getRanking,
  });
  useEffect(() => {
    setRankingData(data);
    if (!rankingData?.rankUsers) return;
    const paginatedItems = chunkArray(rankingData?.rankUsers, 10);
    if (!paginatedItems) return;
    setRankingDataChunks(paginatedItems);
  }, [data]);

  useEffect(() => {
    if (!rankingData?.rankUsers) return;
    const paginatedItems = chunkArray(rankingData?.rankUsers, 10);
    setRankingDataChunks(paginatedItems);
  }, [rankingData]);

  return (
    <div className="relative flex flex-col w-full">
      <div className="flex justify-between w-full font-bold">
        <p>User Ranking</p>
        <p className="opacity-40">2024.03.01 기준</p>
      </div>
      {rankingDataChunks && rankingDataChunks.length > 1 ? (
        <Swiper
          style={{
            // @ts-ignore
            "--swiper-pagination-color": "#6DFCAF",
            "--swiper-pagination-bullet-inactive-color": "#D9D9D9",
          }}
          slidesPerView={1}
          modules={[Autoplay, Pagination, EffectCoverflow]}
          loop={true}
          pagination={{ clickable: true }}
          centeredSlides={true}
          grabCursor={true}
          className="w-full"
          autoplay={{
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          }}
          // effect={"coverflow"}
        >
          {rankingDataChunks?.slice(0, 5).map((item, i) => (
            <SwiperSlide key={i} className="relative w-full mb-10">
              {item.map((user, index) => (
                <RankingContentItem
                  key={index}
                  ranking={user.ranking}
                  avatar={user.avatar}
                  ladderScore={user.ladderScore}
                  nickname={user.nickname}
                />
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <>
          {rankingDataChunks?.map((item, i) => (
            <SwiperSlide key={i} className="relative w-full mb-10">
              {item.map((user, index) => (
                <RankingContentItem
                  key={index}
                  ranking={user.ranking}
                  avatar={user.avatar}
                  ladderScore={user.ladderScore}
                  nickname={user.nickname}
                />
              ))}
            </SwiperSlide>
          ))}
        </>
      )}
    </div>
  );
}
