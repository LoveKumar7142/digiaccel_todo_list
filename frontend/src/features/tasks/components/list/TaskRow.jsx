import TaskIcon from "../icons/TaskIcon.jsx";
import { useRef, useState } from "react";

export default function TaskRow({ task, busy, onView, onEdit, onStatus, onDelete }) {
  const gestureStart = useRef(null);
  const [deleteRevealed, setDeleteRevealed] = useState(false);
  const completed = task.status === "completed";

  function handlePointerUp(event) {
    const start = gestureStart.current;
    gestureStart.current = null;
    if (!start || start.id !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      setDeleteRevealed(deltaX < 0);
    }
  }

  return (
    <li
      className="task-row"
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        gestureStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
      }}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        gestureStart.current = null;
      }}
    >
      <div className="task-content">
        <input
          type="checkbox"
          checked={completed}
          disabled={busy}
          aria-label={`Mark ${task.title} ${completed ? "in progress" : "completed"}`}
          onChange={() => onStatus(task)}
        />
        <div className="task-copy">
          <button
            className={`task-title${completed ? " done" : ""}`}
            disabled={busy}
            onClick={() => onView(task)}
          >
            {task.title}
          </button>
        </div>
        <button
          className="row-action"
          aria-label="Delete"
          disabled={busy}
          onClick={() => onDelete(task)}
        >
          <TaskIcon name="trash" />
        </button>
        <button
          className="row-action"
          aria-label="Edit"
          disabled={busy}
          onClick={() => onEdit(task)}
        >
          <TaskIcon name="edit" />
        </button>
      </div>
      {deleteRevealed && (
        <button
          className="swipe-delete"
          disabled={busy}
          onClick={() => onDelete(task)}
        >
          Delete task
        </button>
      )}
    </li>
  );
}

