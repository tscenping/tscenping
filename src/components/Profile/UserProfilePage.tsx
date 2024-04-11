import { useQuery } from "@tanstack/react-query";
import { instance } from "../Util/axios";
import ProfileMatchData from "./MatchData/ProfileMatchData";
import MatchHistory from "./MatchHistory/MatchHistory";
import Setting from "./Setting/Setting";
import ProfileUser from "./UserProfile/ProfileUser";
import { useEffect, useState } from "react";
import { useUserProfileState } from "../../store/profile";

const svgWidth = 60;
const svgHeight = 60;
const username = "hyeongwoo";

interface UserProps {
  username: string | undefined;
}

export default function UserProfilePage({ username }: UserProps) {
  const { setUserProfile } = useUserProfileState();

  const getProfileData = async () => {
    try {
      const response = await instance.get(`users/profile/${username}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["profileData", { username }],
    queryFn: getProfileData,
  });

  useEffect(() => {
    if (!data) return;
    setUserProfile(data);
  }, [data]);

  return (
    <section className="flex flex-col justify-start h-full mt-1 gap-y-4">
      <ProfileUser />
      <ProfileMatchData />
      <MatchHistory />
    </section>
  );
}
