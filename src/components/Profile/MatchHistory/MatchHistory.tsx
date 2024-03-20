import RecentMatch from "./RecentMatch";

export default function MatchHistory() {
  return (
    <section className="flex flex-col">
      <div className="flex justify-between">
        <p className="">최근전적</p>
        <p>{">"}</p>
      </div>
      <RecentMatch />
    </section>
  );
}
