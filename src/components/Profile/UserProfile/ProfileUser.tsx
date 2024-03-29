import defailtImg from "../../../../src/img/Main/DefaultPorfileImg.svg";

const svgWidth = 100;
const svgHeight = 100;
const username = "hyeongwoo";

export default function ProfileUser() {
  return (
    <section className="flex flex-row items-center gap-4 justify-normal">
      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
      />
      <div className="flex flex-col w-full h-full text-white strong">
        <div className="flex justify-between">
          <p>{username}</p>
          <p className="border-2 border-white border-solid rounded-[20px] py-1 px-2 cursor-pointer">
            친구 추가
          </p>
        </div>
        <p className="text-[#A9A9A9] mb-3 ">안녕하세요</p>
        <div className="flex justify-end gap-3 h-2/3">
          <button className="w-2/5 h-full text-black bg-[#F7F7F7] rounded-[10px]">
            1:1 메세지
          </button>
          <button className="w-2/5 h-full bg-[#F7F7F7] text-black rounded-[10px]">
            게임 초대
          </button>
        </div>
      </div>
    </section>
  );
}
