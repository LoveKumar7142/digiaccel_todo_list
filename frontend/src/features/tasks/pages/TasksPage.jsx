import TaskIcon from "../components/icons/TaskIcon.jsx";
import { useState } from "react";
import TaskFormDialog from "../components/dialogs/TaskFormDialog.jsx";
import TaskDetailsDialog from "../components/dialogs/TaskDetailsDialog.jsx";
import DeleteTaskDialog from "../components/dialogs/DeleteTaskDialog.jsx";
import useWeeklyTasks from "../hooks/useWeeklyTasks.js";
import useTaskSearch from "../hooks/useTaskSearch.js";
import useTaskActions from "../hooks/useTaskActions.js";
import TaskHome from "./TaskHome.jsx";
import TaskSearchView from "./TaskSearchView.jsx";
import WeeklyTasksView from "./WeeklyTasksView.jsx";
import { todayInIst } from "../utils/calendar.js";
import "./TasksPage.css";

export default function TasksPage() {
  const [screen, setScreen] = useState("home");
  const [day, setDay] = useState(todayInIst);
  const [revision, setRevision] = useState(0);
  const refresh = () => setRevision((value) => value + 1);
  const { search, setSearch, searchResults } =
    useTaskSearch(revision);
  const { weeks, weekTasks, selectedWeek, toggleWeek } = useWeeklyTasks(
    revision,
    screen !== "weeks",
  );
  const {
    dialog,
    busy,
    error,
    notice,
    openDialog,
    closeDialog,
    saveTask,
    removeTask,
    toggleStatus,
  } = useTaskActions(refresh);

  const actions = {
    busy,
    onRetry: refresh,
    onView: (task) => openDialog("view", task),
    onEdit: (task) => openDialog("edit", task),
    onDelete: (task) => openDialog("delete", task),
    onStatus: toggleStatus,
  };
  const dialogProps = { busy, error, onClose: closeDialog };

  return (
    <main className="app-shell">
      <div key={screen} className="task-screen">
      {screen !== "home" && (
        <header className="app-header">
          <button className="icon-button" aria-label="Back to home" onClick={() => { setSearch(""); setScreen("home"); }}><TaskIcon name="back" /></button>
          <h1>{screen === "search" ? "Search" : "Weekly tasks"}</h1>
        </header>
      )}
      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}
      {!dialog && error && (
        <p className="state error" role="alert">
          {error}
        </p>
      )}

      {screen === "home" && <TaskHome day={day} onDayChange={setDay} weeks={weeks} revision={revision} actions={actions} onSearch={() => setScreen("search")} onViewAll={() => setScreen("weeks")} />}
      {screen === "search" && <TaskSearchView search={search} onSearchChange={setSearch} result={searchResults} actions={actions} />}
      {screen === "weeks" && <WeeklyTasksView weeks={weeks} weekTasks={weekTasks} selectedWeek={selectedWeek} toggleWeek={toggleWeek} actions={actions} />}
      </div>
      {screen !== "search" && (
        <button className="primary add-button" aria-label="Add task" disabled={busy} onClick={() => openDialog("add")}><TaskIcon name="plus" /></button>
      )}

      {(dialog?.mode === "add" || dialog?.mode === "edit") && (
        <TaskFormDialog
          key={dialog.task?._id || "new"}
          task={dialog.task}
          defaultDay={day}
          onSave={saveTask}
          {...dialogProps}
        />
      )}
      {dialog?.mode === "view" && (
        <TaskDetailsDialog
          task={dialog.task}
          onEdit={actions.onEdit}
          {...dialogProps}
        />
      )}
      {dialog?.mode === "delete" && (
        <DeleteTaskDialog
          task={dialog.task}
          onDelete={removeTask}
          {...dialogProps}
        />
      )}
    </main>
  );
}
