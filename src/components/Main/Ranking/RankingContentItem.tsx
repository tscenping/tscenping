
import { useModalState } from "../../../store/modal";

interface RankingUserList {
  nickname: string;
  avatar: string;
  ladderScore: number;
  ranking: number;
}

export default function RankingContentItem(props: RankingUserList) {
  const { setModalName, setModalProps } = useModalState();

  return (
    <li
      className="flex items-center justify-start w-full gap-2 bg-[#424242] h-[42px] sm:h-[56px] mb-3 relative cursor-pointer rounded-2xl sm:rounded-3xl hover:border-white hover:shadow-inner"
      onClick={() => {
        setModalProps({ nickname: props.nickname });
        setModalName("profile");
      }}
    >
      <div
        className={`font-[League-SpartanBold] ml-4 min-w-3 text-2xl ${
          props.ranking <= 3 ? "text-customGreen" : ""
        }`}
      >
        {props.ranking}
      </div>
      <div className="font-[Pretendard] text-base">{props.nickname}</div>
    </li>
  );
}
