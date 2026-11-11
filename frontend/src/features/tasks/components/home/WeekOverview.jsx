import TaskIcon from "../icons/TaskIcon.jsx";
export default function WeekOverview({ summary, result, onRetry }) {
  if (result.loading) return <p className="state" role="status">Loading weekly progress…</p>;
  if (result.error) return <p className="state error" role="alert">{result.error} <button className="text-button" onClick={onRetry}>Retry</button></p>;

  const completed = summary?.completedCount ?? 0;
  const pending = summary?.openCount ?? 0;
  const total = completed + pending;

  return (
    <section aria-label="Weekly overview">
      <div className="overview-counts">
        <div className="overview-count completed">
          <span className="count-symbol" aria-hidden="true"><TaskIcon name="completed" /></span>
          <div><span>Task Complete</span><p><strong>{String(completed).padStart(2, "0")}</strong> This Week</p></div>
        </div>
        <div className="overview-count pending">
          <span className="count-symbol" aria-hidden="true"><TaskIcon name="pending" /></span>
          <div><span>Task Pending</span><p><strong>{String(pending).padStart(2, "0")}</strong> This Week</p></div>
        </div>
      </div>
      <h2 className="section-title">Weekly Progress</h2>
      <progress aria-label="Weekly progress" value={completed} max={total || 1} />
    </section>
  );
}
