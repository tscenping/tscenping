import { useQuery } from "@tanstack/react-query";
import ProfileMatchData from "./MatchData/ProfileMatchData";
import MatchHistory from "./MatchHistory/MatchHistory";
import Setting from "./Setting/Setting";
import ProfileUser from "./UserProfile/ProfileUser";
import { useEffect } from "react";
import { useMyData, useUserProfileState } from "../../store/profile";
import ProfileMe from "./UserProfile/ProfileMe";
import useAxios from "hooks/useAxios";

interface UserProps {
  nickname: string | undefined;
}

export default function UserProfilePage({ nickname }: UserProps) {
  const { myData } = useMyData();
  const { setUserProfile } = useUserProfileState();
  const instance = useAxios();

  const getProfileData = async () => {
    try {
      const response = await instance.get(`users/profile/${nickname}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ["profileData", { nickname }],
    queryFn: getProfileData,
    staleTime: 1000 * 1,
  });

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    if (!data) return;
    //eslint-disable-next-line react-hooks/exhaustive-deps
    setUserProfile(data);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <section className="flex flex-col justify-start h-full mt-1 overflow-auto gap-y-4">
      {nickname === myData.nickname ? (
        <ProfileMe refetch={refetch} />
      ) : (
        <ProfileUser refetch={refetch} />
      )}
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
