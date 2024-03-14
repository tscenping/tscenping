import RankingContentItem from "../Main/Ranking/RankingContentItem";
import { chunkArray } from "../Main/Ranking/RankingList";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  // Navigation,
  // Scrollbar,
  EffectCoverflow,
  Mousewheel,
  Autoplay,
} from "swiper/modules";

interface RankingUserList {
  nickname: string;
  avatar: string;
  ladderScore: number;
  ranking: number;
}

const dummyData: RankingUserList[] = [
  {
    nickname: "닉네임1",
    avatar: "아바타1",
    ladderScore: 1000,
    ranking: 1,
  },
  {
    nickname: "닉네임2",
    avatar: "아바타2",
    ladderScore: 900,
    ranking: 2,
  },
  {
    nickname: "닉네임3",
    avatar: "아바타3",
    ladderScore: 800,
    ranking: 3,
  },
  {
    nickname: "닉네임4",
    avatar: "아바타3",
    ladderScore: 800,
    ranking: 4,
  },
  {
    nickname: "닉네임5",
    avatar: "아바타3",
    ladderScore: 800,
    ranking: 5,
  },
  {
    nickname: "닉네임1",
    avatar: "아바타1",
    ladderScore: 1000,
    ranking: 6,
  },
  {
    nickname: "닉네임2",
    avatar: "아바타2",
    ladderScore: 900,
    ranking: 7,
  },
  {
    nickname: "닉네임3",
    avatar: "아바타3",
    ladderScore: 800,
    ranking: 8,
  },
  {
    nickname: "닉네임4",
    avatar: "아바타3",
    ladderScore: 800,
    ranking: 9,
  },
  {
    nickname: "닉네임5",
    avatar: "아바타3",
    ladderScore: 800,
    ranking: 10,
  },
  {
    nickname: "닉네임1",
    avatar: "아바타1",
    ladderScore: 1000,
    ranking: 11,
  },
  {
    nickname: "닉네임2",
    avatar: "아바타2",
    ladderScore: 900,
    ranking: 12,
  },
  {
    nickname: "닉네임3",
    avatar: "아바타3",
    ladderScore: 800,
    ranking: 13,
  },
  {
    nickname: "닉네임4",
    avatar: "아바타3",
    ladderScore: 800,
    ranking: 14,
  },
  {
    nickname: "닉네임5",
    avatar: "아바타3",
    ladderScore: 800,
    ranking: 15,
  },
];

export default function Ranking() {
  const paginatedItems = chunkArray(dummyData, 10);

  return (
    <>
      <div className="flex justify-between w-full font-bold">
        <p>User Ranking</p>
        <p className="opacity-40">2024.03.01 기준</p>
      </div>
      <Swiper
        style={{
          // @ts-ignore
          "--swiper-pagination-color": "#6DFCAF",
          "--swiper-pagination-bullet-inactive-color": "#D9D9D9",
        }}
        slidesPerView={1}
        modules={[Mousewheel, Autoplay, Pagination, EffectCoverflow]}
        loop={true}
        pagination={{ clickable: true }}
        centeredSlides={true}
        grabCursor={true}
        mousewheel={{
          invert: false,
        }}
        autoplay={{
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        }}
        // effect={"coverflow"}
      >
        {paginatedItems.map((item, i) => (
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
    </>
  );
}
