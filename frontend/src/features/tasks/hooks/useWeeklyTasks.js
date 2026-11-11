import { useCallback, useState } from "react";
import { getTasks, getWeeklySummary } from "../services/taskApi.js";
import useRequest from "./useRequest.js";

export default function useWeeklyTasks(revision, searching) {
  const [selectedWeek, setSelectedWeek] = useState(null);

  const loadWeeks = useCallback(
    (signal) => getWeeklySummary(signal),
    [revision],
  );
  const loadWeekTasks = useCallback(
    (signal) => getTasks({ week: selectedWeek, signal }),
    [selectedWeek, revision],
  );
  const weeks = useRequest(loadWeeks);
  const weekTasks = useRequest(
    loadWeekTasks,
    Boolean(selectedWeek) && !searching,
  );
  function toggleWeek(week) {
    setSelectedWeek((current) =>
      current?.weekStart === week.weekStart ? null : week,
    );
  }

  return { weeks, weekTasks, selectedWeek, toggleWeek };
}
