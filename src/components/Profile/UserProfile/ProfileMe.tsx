import { useUserProfileState } from "../../../store/profile";
import editBtn from "../../../img/Profile/EditBtn.svg";

const svgWidth = 60;
const svgHeight = 60;

export default function ProfileMe() {
  const { userProfileState } = useUserProfileState();

  return (
    <section className="flex flex-col items-center gap-3 justify-normal">
      <div className="relative ">
        <img
          src={userProfileState?.avatar}
          alt="profile img"
          width={svgWidth}
          height={svgHeight}
          className="rounded-[30px] md:rounded-[40px] object-cover"
        />
        <img
          src={editBtn}
          alt="editBtn"
          className="absolute bottom-0 w-1/5 right-1"
        />
      </div>
      <div className="text-white strong">{userProfileState?.nickname}</div>
      <p className="text-[#A9A9A9] ">
        {userProfileState?.statusMessage
          ? userProfileState?.statusMessage
          : "작성된 메세지가 없습니다."}
      </p>
    </section>
  );
}
