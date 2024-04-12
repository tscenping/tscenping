import defailtImg from "../../../../src/img/Main/DefaultPorfileImg.svg";
import { useUserProfileState } from "../../../store/profile";

const svgWidth = 60;
const svgHeight = 60;

export default function ProfileMe() {
  const { userProfileState } = useUserProfileState();
  return (
    <section className="flex flex-col items-center gap-3 justify-normal">
      <img
        src={userProfileState?.avatar}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
      />
      <div className="text-white strong">{userProfileState?.nickname}</div>
      <p className="text-[#A9A9A9] ">{userProfileState?.statusMessage}</p>
    </section>
  );
}
