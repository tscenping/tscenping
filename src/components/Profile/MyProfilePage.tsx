
import ProfileMatchData from "./MatchData/ProfileMatchData";
import MatchHistory from "./MatchHistory/MatchHistory";
import Setting from "./Setting/Setting";
import ProfileMe from "./UserProfile/ProfileMe";


export default function MyProfilePage() {

  return (
    <section className="flex flex-col justify-center h-full py-5 gap-y-4">
      <ProfileMe />
      <ProfileMatchData />
      <MatchHistory />
      <Setting />
    </section>
  );
}
