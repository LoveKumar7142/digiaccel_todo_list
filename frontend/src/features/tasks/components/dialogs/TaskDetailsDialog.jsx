import TaskDialog from "./TaskDialog.jsx";
import { formatTaskDate } from "../../utils/taskDates.js";

export default function TaskDetailsDialog({ task, onEdit, ...dialogProps }) {
  return (
    <TaskDialog heading="Task details" {...dialogProps}>
      <h3>{task.title}</h3>
      {task.description && <p className="description">{task.description}</p>}
      <dl className="details">
        <dt>Date and time</dt>
        <dd>{formatTaskDate(task.scheduledAt)}</dd>
        <dt>Priority</dt>
        <dd>{task.priority || "None"}</dd>
        <dt>Status</dt>
        <dd>{task.status === "completed" ? "Completed" : "In progress"}</dd>
      </dl>
      <div className="dialog-actions">
        <button className="primary" onClick={() => onEdit(task)}>
          Edit task
        </button>
      </div>
    </TaskDialog>
  );
}
