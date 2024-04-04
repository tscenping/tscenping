import profileImg from "../../img/Main/DefaultPorfileImg.svg";

export default function Player() {
  return (
    <div className="flex items-center justify-between mb-3">
      <img src={profileImg} alt="프로필임미지" className="w-1/6" />
      <p>임형우 </p>
      <p>VS</p>
      <p>김한결</p>
      <img src={profileImg} alt="프로필임미지" className="w-1/6" />
    </div>
  );
}
