import TaskDialog from "./TaskDialog.jsx";
import SelectField from "../../../../components/SelectField.jsx";
import { fromDateInput, toDateInput } from "../../utils/taskDates.js";

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function TaskFormDialog({ task, defaultDay, onSave, ...dialogProps }) {
  const scheduledInput = toDateInput(task?.scheduledAt);

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get("title").trim();
    if (!title) {
      const field = event.currentTarget.elements.title;
      field.setCustomValidity("Enter a task title");
      field.reportValidity();
      return;
    }

    const date = form.get("date") + "T" + form.get("time");
    const body = { title, description: form.get("description").trim() };
    // Keep the original timestamp when an edit leaves the date and time alone.
    if (!task || date !== scheduledInput)
      body.scheduledAt = fromDateInput(date);
    const priority = form.get("priority");
    if (priority) body.priority = priority;
    onSave(task, body);
  }

  const { busy } = dialogProps;
  return (
    <TaskDialog className="task-sheet" heading={task ? "Edit Task" : "Add New Task"} {...dialogProps}>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={busy}>
          <label>
            Task title
            <input
              autoFocus
              name="title"
              required
              defaultValue={task?.title}
              onInput={(event) => event.currentTarget.setCustomValidity("")}
            />
          </label>
          <div className="sheet-schedule-row">
            <label>Set Time (IST)<input name="time" type="time" required defaultValue={scheduledInput.slice(11)} /></label>
            <SelectField label="Priority" name="priority" options={priorityOptions}
              defaultValue={task?.priority || "medium"} disabled={busy} />
          </div>
          <label>Set Date<input name="date" type="date" required defaultValue={scheduledInput.slice(0, 10) || defaultDay} /></label>
          <label>Description<textarea name="description" rows="3" placeholder="Add description" defaultValue={task?.description} /></label>
        </fieldset>
        <button className="primary sheet-submit" disabled={busy}>
          {busy ? "Saving..." : task ? "Save changes" : "Create task"}
        </button>
      </form>
    </TaskDialog>
  );
}
