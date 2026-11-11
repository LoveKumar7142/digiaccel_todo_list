import TaskIcon from "../components/icons/TaskIcon.jsx";
import { useCallback } from "react";
import DateStrip from "../components/home/DateStrip.jsx";
import WeekOverview from "../components/home/WeekOverview.jsx";
import TaskList from "../components/list/TaskList.jsx";
import useRequest from "../hooks/useRequest.js";
import { getTasks } from "../services/taskApi.js";
import { dateRange, mondayOf, todayInIst } from "../utils/calendar.js";
import "./TaskHome.css";

export default function TaskHome({ day, onDayChange, weeks, revision, actions, onSearch, onViewAll }) {
  const loadDay = useCallback((signal) => getTasks({ week: dateRange(day, 1), signal }), [day, revision]);
  const tasks = useRequest(loadDay);
  const { weekStart } = dateRange(mondayOf(day), 7);
  const summary = weeks.data?.find((week) => week.weekStart === weekStart);

  return (
    <>
      <button className="home-search" onClick={onSearch}>Search for a task <TaskIcon name="search" /></button>
      <DateStrip day={day} onChange={onDayChange} />
      <WeekOverview result={weeks} summary={summary} onRetry={actions.onRetry} />
      <section aria-label="Tasks for selected day">
        <div className="task-section-header">
          <h2 className="section-title">{day === todayInIst() ? "Tasks Today" : "Tasks for selected day"}</h2>
          <button className="text-button" onClick={onViewAll}>View All</button>
        </div>
        <TaskList result={tasks} emptyMessage="No tasks scheduled for this day." {...actions} />
      </section>
    </>
  );
}
