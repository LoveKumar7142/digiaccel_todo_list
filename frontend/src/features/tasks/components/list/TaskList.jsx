import TaskRow from "./TaskRow.jsx";
import "./TaskList.css";

export default function TaskList({
  result,
  emptyMessage,
  onRetry,
  ...actions
}) {
  if (result.loading)
    return (
      <p className="state" role="status">
        Loading tasks…
      </p>
    );
  if (result.error)
    return (
      <p className="state" role="alert">
        {result.error}{" "}
        <button className="text-button" onClick={onRetry}>
          Retry
        </button>
      </p>
    );
  if (!result.data?.length) return <p className="state">{emptyMessage}</p>;

  return (
    <ul className="task-list">
      {result.data.map((task) => (
        <TaskRow key={task._id} task={task} {...actions} />
      ))}
    </ul>
  );
}
