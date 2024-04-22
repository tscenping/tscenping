import { instance } from "components/Util/axios";
import { useModalState } from "store/modal";
import { useMyData } from "store/profile";

export default function Setting() {
  const { setModalName } = useModalState();
  const { setMyData } = useMyData();
  const logoutHandler = async () => {
    try {
      await instance.patch("/auth/signout", {}).then(function (res) {
        console.log(res);
      });
      setMyData({ id: -1, nickname: "" });
      setModalName(null);
    } catch (e) {}
  };
  return (
    <ul className="flex flex-col justify-between w-full text-[#A9A9A9] gap-4">
      <li className="flex items-center justify-between cursor-pointer">
        <p>2차인증</p>
        <p>{">"}</p>
      </li>
      <li
        className="flex items-center justify-between cursor-pointer"
        onClick={logoutHandler}
      >
        <p>로그아웃</p>
        <p>{">"}</p>
      </li>
    </ul>
  );
}
