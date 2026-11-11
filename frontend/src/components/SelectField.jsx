import { useId, useRef, useState } from "react";
import "./SelectField.css";

export default function SelectField({ label, name, options, defaultValue, disabled }) {
  const id = useId();
  const trigger = useRef(null);
  const [value, setValue] = useState(defaultValue);
  const [menu, setMenu] = useState(null);
  const selected = Math.max(0, options.findIndex((option) => option.value === value));

  function open(index = selected) {
    const button = trigger.current;
    const rect = button.getBoundingClientRect();
    const dialog = button.closest("dialog")?.getBoundingClientRect();
    const below = Math.min(window.innerHeight, dialog?.bottom ?? Infinity) - rect.bottom;
    const above = rect.top - Math.max(0, dialog?.top ?? 0);
    const upward = below < options.length * 36 + 16 && above > below;
    setMenu({ index, upward, height: Math.max(48, Math.floor((upward ? above : below) - 8)) });
  }

  function choose(index) {
    setValue(options[index].value);
    setMenu(null);
    trigger.current.focus();
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && menu) {
      event.preventDefault();
      event.stopPropagation();
      setMenu(null);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (menu) choose(menu.index);
      else open();
      return;
    }

    const last = options.length - 1;
    const index = menu?.index ?? selected;
    const next = {
      ArrowDown: Math.min(last, index + 1),
      ArrowUp: Math.max(0, index - 1),
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;

    event.preventDefault();
    if (menu) setMenu({ ...menu, index: next });
    else open(next);
  }

  return (
    <div className="select-field">
      <span id={`${id}-label`} className="select-field-label">{label}</span>
      <input type="hidden" name={name} value={value} disabled={disabled} />
      <button
        ref={trigger}
        type="button"
        role="combobox"
        className="select-field-trigger"
        aria-labelledby={`${id}-label`}
        aria-expanded={Boolean(menu)}
        aria-controls={`${id}-options`}
        aria-activedescendant={menu ? `${id}-option-${menu.index}` : undefined}
        disabled={disabled}
        onClick={() => menu ? setMenu(null) : open()}
        onKeyDown={handleKeyDown}
        onBlur={() => setMenu(null)}
      >
        <span>{options[selected].label}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul id={`${id}-options`} role="listbox" aria-labelledby={`${id}-label`} hidden={!menu}
        className={`select-field-menu${menu?.upward ? " opens-up" : ""}`}
        style={{ maxHeight: menu?.height }}>
        {options.map((option, index) => (
          <li key={option.value} id={`${id}-option-${index}`} role="option" aria-selected={index === selected}
            className={index === menu?.index ? "is-active" : undefined}
            ref={(element) => {
              if (element && index === menu?.index) element.scrollIntoView({ block: "nearest" });
            }}
            onPointerDown={(event) => event.preventDefault()}
            onClick={() => choose(index)}>
            <span>{option.label}</span>
            {index === selected && <span aria-hidden="true">✓</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
