import { Swiper, SwiperSlide } from "swiper/react";
import RankingContentItem from "./RankingContentItem";
import { Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/grid";
import "swiper/swiper-bundle.css";
import { instance } from "../../Util/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";



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

export const chunkArray = <T extends any>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};

export default function RankingList() {
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

  const { data } = useQuery({
    queryKey: ["rankingData"],
    queryFn: getRanking,
  });
  useEffect(() => {
    setRankingData(data);
  }, [data]);

  useEffect(() => {
    if (!rankingData?.rankUsers) return;
    const paginatedItems = chunkArray(rankingData?.rankUsers, 5);
    if (!paginatedItems) return;
    setRankingDataChunks(paginatedItems);
  }, [rankingData]);

  // const paginatedItems = chunkArray(rankingData, 5);

  return (
    <ul className="items-center w-full h-full overflow-x-hidden">
      <div className="overflow-x-hidden">
        {rankingDataChunks && rankingDataChunks.length > 1 ? (
          <Swiper
            style={{
              // @ts-ignore
              "--swiper-pagination-color": "#6DFCAF",
              "--swiper-pagination-bullet-inactive-color": "#D9D9D9",
            }}
            className="relative flex h-full"
            slidesPerView={1}
            modules={[Autoplay, Pagination, EffectCoverflow]}
            loop={true}
            pagination={{ clickable: true }}
            centeredSlides={true}
            grabCursor={true}
            autoplay={{
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: false,
            }}
            effect={"coverflow"}
          >
            {rankingDataChunks?.slice(0, 5).map((user, i) => (
              <ul className="flex flex-col" key={i}>
                <SwiperSlide key={i} className="relative w-full mb-10">
                  {user.map((user, index) => (
                    <RankingContentItem
                      ranking={user.ranking}
                      avatar={user.avatar}
                      ladderScore={user.ladderScore}
                      nickname={user.nickname}
                      key={index}
                    />
                  ))}
                </SwiperSlide>
              </ul>
            ))}
          </Swiper>
        ) : (
          <>
            {rankingDataChunks?.slice(0, 5).map((user, i) => (
              <ul className="flex flex-col" key={i}>
                <SwiperSlide key={i} className="relative w-full mb-10">
                  {user.map((user, index) => (
                    <RankingContentItem
                      ranking={user.ranking}
                      avatar={user.avatar}
                      ladderScore={user.ladderScore}
                      nickname={user.nickname}
                      key={index}
                    />
                  ))}
                </SwiperSlide>
              </ul>
            ))}
          </>
        )}
      </div>
    </ul>
  );
}
