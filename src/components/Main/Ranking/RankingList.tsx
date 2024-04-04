import { Swiper, SwiperSlide } from "swiper/react";
import RankingContentItem from "./RankingContentItem";
import {
  Pagination,
  EffectCoverflow,
  Mousewheel,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/effect-coverflow";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/grid";
import "swiper/swiper-bundle.css";

interface RankingUserList {
  nickname: string;
  avatar: string;
  ladderScore: number;
  ranking: number;
}

// const query = useQuery({
//   queryKey: ['ranking'],
//   queryFn: async () => {
//     const response = await fetch('http://localhost:4000/ranking');
//     return response.json();
//   }
// })

export const chunkArray = <T extends any>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};

export default function RankingList() {
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

  const paginatedItems = chunkArray(dummyData, 5);

  return (
    <ul className="items-center w-full h-full overflow-x-hidden">
      <div className="overflow-x-hidden">
        <Swiper
          style={{
            // @ts-ignore
            "--swiper-pagination-color": "#6DFCAF",
            "--swiper-pagination-bullet-inactive-color": "#D9D9D9",
          }}
          className="relative flex h-full"
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
          effect={"coverflow"}
        >
          {paginatedItems.map((user, i) => (
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
      </div>
    </ul>
  );
}
