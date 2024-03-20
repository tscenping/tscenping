import defailtImg from "../../../src/img/Main/DefaultPorfileImg.svg";
import ProfileMatchData from "./MatchData/ProfileMatchData";
import MatchHistory from "./MatchHistory/MatchHistory";
import Setting from "./Setting/Setting";
import ProfileMe from "./UserProfile/ProfileMe";

const svgWidth = 60;
const svgHeight = 60;
const username = "hyeongwoo";

export default function MyProfilePage() {
  return (
    <section className="flex flex-col justify-center h-full py-5">
      <ProfileMe />
      <ProfileMatchData />
      <MatchHistory />
      <Setting />
    </section>
  );
}
