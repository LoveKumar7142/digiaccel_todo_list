import TaskSearch from "../components/search/TaskSearch.jsx";
import TaskList from "../components/list/TaskList.jsx";

export default function TaskSearchView({ search, onSearchChange, result, actions }) {
  return (
    <section aria-label="Search tasks">
      <TaskSearch value={search} onChange={onSearchChange} autoFocus />
      {search.trim() && <TaskList result={result} emptyMessage="No matching tasks." {...actions} />}
    </section>
  );
}
