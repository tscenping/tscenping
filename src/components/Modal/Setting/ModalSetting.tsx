import { useModalState } from "store/modal";

export default function ModalSetting() {
  const { prevName, setModalName } = useModalState();
  

  return (
    <ul className="flex flex-col items-center justify-center h-full">
      <li
        onClick={() => {
          setModalName(prevName!);
        }}
      >
        뒤로가기
      </li>
      <li>2차 인증</li>
      <li>로그아웃</li>
    </ul>
  );
}
