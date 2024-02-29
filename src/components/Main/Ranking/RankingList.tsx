import { useQuery } from "@tanstack/react-query";
import RankingContentItem from "./RankingContentItem";

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
  ];
  return (
    <div className="flex flex-col items-center w-full h-full py-5">
      {dummyData.map((user, index) => (
        <div
          key={index}
          className="relative flex flex-row items-center w-3/4 py-3 mx-2 mt-3 duration-200 ease-in-out bg-white shadow-md cursor-pointer justify-items-start hover:scale-105 transform:scale rounded-xl hover:shadow-custom-white bg-opacity-10 hover:bg-opacity-20"
        >
          <RankingContentItem
            ranking={user.ranking}
            avatar={user.avatar}
            ladderScore={user.ladderScore}
            nickname={user.nickname}
          />
        </div>
      ))}
    </div>
  );
}
