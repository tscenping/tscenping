import defailtImg from "../../../../src/img/Main/DefaultPorfileImg.svg";

const svgWidth = 60;
const svgHeight = 60;
const username = "hyeongwoo";

export default function ProfileUser() {
  return (
    <section className="flex flex-row items-center gap-3 justify-normal">
      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
      />
      <div className="w-full text-white strong">
        <div className="flex justify-between">
          <p>{username}</p>
          <img src={defailtImg} alt="profile img" width={15} height={15} />
        </div>
        <p className="text-[#A9A9A9] ">안녕하세요</p>
        <div className="flex gap-5">
          <button className="w-1/3 text-black bg-[#F7F7F7] rounded-xl">
            1:1 메세지
          </button>
          <button className="w-1/3 bg-[#F7F7F7] text-black rounded-xl">
            게임 초대
          </button>
        </div>
      </div>
    </section>
  );
}
