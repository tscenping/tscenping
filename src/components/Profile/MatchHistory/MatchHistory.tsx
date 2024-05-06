import RecentMatch from "./RecentMatch";

export default function MatchHistory() {
  return (
    <section className="flex flex-col gap-3 overflow-auto h-2/3">
      <div className="flex justify-between">
        <p className="">최근전적</p>
      </div>
      <RecentMatch />
    </section>
  );
}
