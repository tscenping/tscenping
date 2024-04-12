import { useQuery } from "@tanstack/react-query";
import { instance } from "../Util/axios";
import ProfileMatchData from "./MatchData/ProfileMatchData";
import MatchHistory from "./MatchHistory/MatchHistory";
import Setting from "./Setting/Setting";
import ProfileUser from "./UserProfile/ProfileUser";
import { useEffect, useState } from "react";
import { useMyData, useUserProfileState } from "../../store/profile";
import ProfileMe from "./UserProfile/ProfileMe";

const svgWidth = 60;
const svgHeight = 60;

interface UserProps {
  nickname: string | undefined;
}

export default function UserProfilePage({ nickname }: UserProps) {
  const { myData } = useMyData();
  const { setUserProfile } = useUserProfileState();

  const getProfileData = async () => {
    try {
      const response = await instance.get(`users/profile/${nickname}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["profileData", { nickname }],
    queryFn: getProfileData,
  });

  useEffect(() => {
    if (!data) return;
    setUserProfile(data);
    console.log(data);
  }, [data]);

  return (
    <section className="flex flex-col justify-start h-full mt-1 gap-y-4">
      {nickname === myData.nickname ? <ProfileMe /> : <ProfileUser />}
      <ProfileMatchData
        ladderRank={data?.ladderRank}
        ladderScore={data?.ladderScore}
        ladderMaxScore={data?.ladderMaxScore}
        totalCount={data?.totalCount}
        winCount={data?.winCount}
        loseCount={data?.loseCount}
      />
      <MatchHistory />
      {nickname === myData.nickname && <Setting />}
    </section>
  );
}
