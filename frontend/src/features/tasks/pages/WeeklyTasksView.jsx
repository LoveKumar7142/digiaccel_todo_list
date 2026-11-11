import WeeklyCard from "../components/weekly/WeeklyCard.jsx";
import TaskList from "../components/list/TaskList.jsx";

export default function WeeklyTasksView({ weeks, weekTasks, selectedWeek, toggleWeek, actions }) {
  return (
    <section aria-label="Weekly tasks">
      {weeks.loading && (
        <p className="state" role="status">
          Loading weeks…
        </p>
      )}
      {weeks.error && (
        <p className="state error" role="alert">
          {weeks.error}{" "}
          <button className="text-button" onClick={actions.onRetry}>
            Retry
          </button>
        </p>
      )}
      {weeks.data?.length === 0 && (
        <p className="state">
          No tasks scheduled. Add a task to get started.
        </p>
      )}
      <div className="week-list">
        {weeks.data?.map((week) => {
          const expanded = selectedWeek?.weekStart === week.weekStart;
          return (
            <WeeklyCard
              key={week.weekStart}
              week={week}
              expanded={expanded}
              onToggle={() => toggleWeek(week)}
            >
              <TaskList
                result={weekTasks}
                emptyMessage="No tasks this week."
                {...actions}
              />
            </WeeklyCard>
          );
        })}
      </div>
    </section>
  );
}
