import userCheck from "img/Main/SpecialCheck.svg";
import userUncheck from "img/Main/SpecialUncheck.svg";
import defaultProfile from "img/Login/defaultProfileImage.svg";

interface selectUserInfoTypes {
  nickname?: string;
  userId?: number;
}

interface UserListProps {
  nickname: string;
  avatar: string;
  id: number;
  status: "ONLINE" | "OFFLINE" | "";
  isFriend: boolean;
  isBlocked: boolean;
  selectNickname?: string;
  selectUserId?: number;
  setSelectNickname: (v: selectUserInfoTypes) => void;
}

const UserList = (props: UserListProps): JSX.Element => {
  const selectUserHandler = (nickname: string) => {
    if (props.selectNickname === nickname) props.setSelectNickname({});
    else {
      props.setSelectNickname({
        nickname: props.nickname,
        userId: props.id,
      });
    }
  };

  return (
    <li
      className="flex items-center justify-between cursor-pointer mb-7"
      onClick={() => {
        selectUserHandler(props.nickname);
      }}
    >
      <label className="flex items-center" htmlFor="user1">
        <img
          src={props.avatar ? props.avatar : defaultProfile}
          alt="UserImage"
          className="w-10 mr-3 rounded-full aspect-square object-cover"
        />
        <span className="text-base">{props.nickname}</span>
      </label>
      <section>
        <input
          type="checkbox"
          id="user1"
          className="hidden"
          name="friendUser"
          value={props.nickname}
        />
        <img
          src={
            props.selectNickname === props.nickname ? userCheck : userUncheck
          }
          alt="check user"
        />
      </section>
    </li>
  );
};

export default UserList;
