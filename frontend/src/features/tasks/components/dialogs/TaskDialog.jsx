import TaskIcon from "../icons/TaskIcon.jsx";
import { useEffect, useRef, useState } from "react";
import "./TaskDialogs.css";

export default function TaskDialog({
  heading,
  className,
  busy,
  error,
  onClose,
  children,
}) {
  const element = useRef(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const modal = element.current;
    modal.showModal();
    return () => modal.close();
  }, []);

  useEffect(() => {
    if (!closing) return;
    // Finish the close even if the browser skips the animation event.
    const timeout = window.setTimeout(onClose, 300);
    return () => window.clearTimeout(timeout);
  }, [closing, onClose]);

  function requestClose() {
    if (busy || closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    setClosing(true);
  }

  return (
    <dialog
      ref={element}
      className={className}
      data-closing={closing || undefined}
      aria-labelledby="dialog-title"
      onAnimationEnd={(event) => {
        if (closing && event.target === event.currentTarget &&
          (event.animationName === "task-sheet-out" || event.animationName === "task-dialog-out")) {
          onClose();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
    >
      <div className="dialog-header">
        <h2 id="dialog-title">{heading}</h2>
        <button
          className="icon-button"
          type="button"
          aria-label="Close"
          disabled={busy || closing}
          onClick={requestClose}
        >
          <TaskIcon name="close" />
        </button>
      </div>
      {error && (
        <p className="state error" role="alert">
          {error}
        </p>
      )}

      {children}
    </dialog>
  );
}
