import TaskDialog from "./TaskDialog.jsx";

export default function DeleteTaskDialog({ task, onDelete, ...dialogProps }) {
  const { busy, onClose } = dialogProps;
  return (
    <TaskDialog heading="Delete task?" {...dialogProps}>
      <p>
        Delete <strong>{task.title}</strong>?
      </p>
      <div className="dialog-actions">
        <button className="secondary" disabled={busy} onClick={onClose}>
          Cancel
        </button>
        <button
          className="danger"
          disabled={busy}
          onClick={() => onDelete(task)}
        >
          {busy ? "Deleting…" : "Delete"}
        </button>
      </div>
    </TaskDialog>
  );
}
