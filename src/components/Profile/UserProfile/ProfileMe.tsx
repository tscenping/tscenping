import defailtImg from "../../../../src/img/Main/DefaultPorfileImg.svg";

const svgWidth = 60;
const svgHeight = 60;
const username = "hyeongwoo";

export default function ProfileMe() {
  return (
    <section className="flex flex-col items-center gap-3 justify-normal">
      <img
        src={defailtImg}
        alt="profile img"
        width={svgWidth}
        height={svgHeight}
      />
      <div className="text-white strong">{username}</div>
      <p className="text-[#A9A9A9] ">안녕하세요</p>
    </section>
  );
}
