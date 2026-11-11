import { useState } from "react";
import OnboardingPage from "./features/tasks/pages/OnboardingPage.jsx";
import TasksPage from "./features/tasks/pages/TasksPage.jsx";

export default function App() {
  const [started, setStarted] = useState(
    () => localStorage.getItem("todo-onboarding") === "done",
  );
  if (started) return <TasksPage />;

  return (
    <OnboardingPage
      onStart={() => {
        localStorage.setItem("todo-onboarding", "done");
        setStarted(true);
      }}
    />
  );
}
