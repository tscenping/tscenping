import RecentMatch from "./RecentMatch";

export default function MatchHistory() {
  return (
    <section className="flex flex-col gap-3 mb-5 overflow-auto">
      <div className="flex justify-between">
        <p className="">최근전적</p>
      </div>
      <RecentMatch />
    </section>
  );
}
