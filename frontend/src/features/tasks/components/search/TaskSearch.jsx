import TaskIcon from "../icons/TaskIcon.jsx";
import "./TaskSearch.css";

export default function TaskSearch({ value, onChange, autoFocus }) {
  return (
    <label className="search-box">
      <input
        type="search"
        autoFocus={autoFocus}
        aria-label="Search tasks"
        placeholder="Search tasks"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <TaskIcon name="search" />
    </label>
  );
}
