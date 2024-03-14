// import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Pagination } from "swiper/core";
// import "swiper/swiper.min.css";
// import "swiper/components/pagination/pagination.min.css";

import RankingContentItem from "./RankingContentItem";
import {
  Pagination,
  // Navigation,
  // Scrollbar,
  EffectCoverflow,
  Mousewheel,
  Autoplay,
} from "swiper/modules";

// import "swiper/css";
// import "swiper/scss/pagination";
// import "swiper/scss/navigation";
// import "swiper/scss/pagination";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
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
    <ul className="items-center w-full overflow-x-hidden">
      <div className="overflow-x-hidden">
        <Swiper
          style={{
            // @ts-ignore
            "--swiper-pagination-color": "#6DFCAF",
            "--swiper-pagination-bullet-inactive-color": "#D9D9D9",
          }}
          // spaceBetween={50}
          className="relative flex h-full"
          slidesPerView={1}
          // navigation
          // pagination={true}
          modules={[Mousewheel, Autoplay, Pagination, EffectCoverflow]}
          loop={true}
          pagination={{ clickable: true }}
          // pagination={customPagination}
          // pagination={{

          //   clickable: true,
          //   bulletClass:
          //     "w-2.5 h-2.5 !bg-green-500 block rounded-full cursor-pointer absolute",
          //   bulletActiveClass: "!bg-green-500",
          //   // bulletInActiveClass: "!bg-yellow-500",
          //   el: "#pagination",
          // }}
          centeredSlides={true}
          grabCursor={true}
          // scrollbar={{ draggable: true }}
          mousewheel={{
            invert: false,
          }}
          autoplay={{
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          }}
          effect={"coverflow"}
          // breakpoints={{
          //   0: {
          //     spaceBetween: 10,
          //     slidesPerView: 1,
          //   },
          // 468: {
          //   spaceBetween: 10,
          //   slidesPerView: 2,
          // },
          // 768: {
          //   spaceBetween: 15,
          //   slidesPerView: 3,
          // },
          // 1024: {
          //   spaceBetween: 15,
          //   slidesPerView: 4,
          // },
          // 1280: {
          //   spaceBetween: 30,
          //   slidesPerView: 5,
          // },
          // }}
          // scrollbar={{ draggable: true }}
          // slidesPerView={1}
          // pagination={{ clickable: true }}
        >
          {paginatedItems.map((user, i) => (
            <SwiperSlide key={i} className="relative w-full mb-10">
              <ul className="flex flex-col gap-3">
                {user.map((user, index) => (
                  <li
                    className="flex items-center justify-center w-full gap-3"
                    key={index}
                  >
                    <RankingContentItem
                      ranking={user.ranking}
                      avatar={user.avatar}
                      ladderScore={user.ladderScore}
                      nickname={user.nickname}
                    />
                  </li>
                ))}
              </ul>
            </SwiperSlide>
          ))}
          {/* {dummyData.map((user, index) => (
        <li
          key={index}
          className="relative flex flex-row items-center w-full py-3 mx-2 mt-3 duration-200 ease-in-out bg-white shadow-md cursor-pointer justify-items-start hover:scale-105 transform:scale rounded-xl hover:shadow-custom-white bg-opacity-10 hover:bg-opacity-20"
        >
          {index >= 4 && (
            
          <RankingContentItem
            ranking={user.ranking}
            avatar={user.avatar}
            ladderScore={user.ladderScore}
            nickname={user.nickname}
          />  
          )}
          
        </li>
      ))} */}
        </Swiper>
      </div>
    </ul>
  );
}
