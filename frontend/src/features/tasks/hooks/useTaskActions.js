import { useState } from "react";
import { createTask, deleteTask, updateTask } from "../services/taskApi.js";

export default function useTaskActions(refresh) {
  const [dialog, setDialog] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function openDialog(mode, task) {
    setError("");
    setDialog({ mode, task });
  }

  async function changeTask(action, message) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
      setDialog(null);
      setNotice(message);
      // A date or status change can affect both the task list and the weekly counts.
      refresh();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  function closeDialog() {
    setDialog(null);
    setError("");
  }

  function saveTask(task, body) {
    if (task)
      return changeTask(() => updateTask(task._id, body), "Task updated.");
    return changeTask(() => createTask(body), "Task added.");
  }

  function removeTask(task) {
    return changeTask(() => deleteTask(task._id), "Task deleted.");
  }

  function toggleStatus(task) {
    const status = task.status === "completed" ? "in_progress" : "completed";
    return changeTask(
      () => updateTask(task._id, { status }),
      "Task status updated.",
    );
  }

  return {
    dialog,
    busy,
    error,
    notice,
    openDialog,
    closeDialog,
    saveTask,
    removeTask,
    toggleStatus,
  };
}
