import { mondayOf, shiftDay } from "../../utils/calendar.js";

const dayLabel = new Intl.DateTimeFormat("en", { weekday: "short", timeZone: "UTC" });
const dateLabel = new Intl.DateTimeFormat("en", { dateStyle: "full", timeZone: "UTC" });

export default function DateStrip({ day, onChange }) {
  const monday = mondayOf(day);

  return (
    <nav className="date-strip" aria-label="Task dates">
      <button className="date-arrow" aria-label="Previous week" onClick={() => onChange(shiftDay(day, -7))}>‹</button>
      {Array.from({ length: 7 }, (_, index) => {
        const date = shiftDay(monday, index);
        return (
          <button key={date} aria-label={dateLabel.format(new Date(date))} aria-pressed={date === day} onClick={() => onChange(date)}>
            <span>{dayLabel.format(new Date(date))}</span>
            <strong>{date.slice(-2)}</strong>
          </button>
        );
      })}
      <button className="date-arrow" aria-label="Next week" onClick={() => onChange(shiftDay(day, 7))}>›</button>
    </nav>
  );
}
