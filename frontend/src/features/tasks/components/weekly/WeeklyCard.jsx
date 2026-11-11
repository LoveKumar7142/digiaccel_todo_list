import { formatWeek } from "../../utils/taskDates.js";
import TaskIcon from "../icons/TaskIcon.jsx";

import "./WeeklyCard.css";

export default function WeeklyCard({ week, expanded, onToggle, children }) {
  const panelId = `week-${week.weekStart}`;
  const total = week.openCount + week.completedCount;

  return (
    <section className="week-card">
      <h2>
        <button
          className="week-toggle"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="week-calendar"><TaskIcon name="calendar" /></span>
          <span className="week-date">{formatWeek(week)}</span>
          <span className="week-chevron"><TaskIcon name="chevron" /></span>
        </button>
      </h2>
      <div className="week-counts">
        <div className="week-metric week-open"><span>Open</span><strong>{week.openCount}</strong></div>
        <div className="week-metric week-complete"><span>Completed</span><strong>{week.completedCount}</strong></div>
      </div>
      <progress className="week-progress" aria-label="Week completion" value={week.completedCount} max={total || 1} />
      <div id={panelId} className="week-tasks" hidden={!expanded}>
        {expanded && children}
      </div>
    </section>
  );
}
