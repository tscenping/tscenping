import ProfileMatchData from "./MatchData/ProfileMatchData";
import MatchHistory from "./MatchHistory/MatchHistory";
import Setting from "./Setting/Setting";
import ProfileUser from "./UserProfile/ProfileUser";

const svgWidth = 60;
const svgHeight = 60;
const username = "hyeongwoo";

interface UserProps {
  username: string | undefined;
}

export default function UserProfilePage({ username }: UserProps) {
  return (
    <section className="flex flex-col justify-start h-full mt-1 gap-y-4">
      <ProfileUser />
      <ProfileMatchData />
      <MatchHistory />
      <Setting />
    </section>
  );
}
