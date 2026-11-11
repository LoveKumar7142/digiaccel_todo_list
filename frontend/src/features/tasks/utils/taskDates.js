const timezone = "Asia/Kolkata";
const weekDate = new Intl.DateTimeFormat("en-IN", {
  timeZone: timezone,
  day: "numeric",
  month: "short",
});
const taskDate = new Intl.DateTimeFormat("en-IN", {
  timeZone: timezone,
  dateStyle: "medium",
  timeStyle: "short",
});
const inputDate = new Intl.DateTimeFormat("sv-SE", {
  timeZone: timezone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function formatWeek(week) {
  // The API gives us next Monday. Step back one millisecond to display Sunday.
  const sunday = new Date(Date.parse(week.weekEndExclusive) - 1);
  const year = new Intl.DateTimeFormat("en-IN", {
    timeZone: timezone,
    year: "numeric",
  });
  const start = new Date(week.weekStart);
  if (year.format(start) !== year.format(sunday)) {
    return `${weekDate.format(start)} ${year.format(start)} – ${weekDate.format(sunday)} ${year.format(sunday)}`;
  }
  return `${weekDate.format(start)} – ${weekDate.format(sunday)} ${year.format(sunday)}`;
}

export const formatTaskDate = (value) =>
  `${taskDate.format(new Date(value))} IST`;

export function toDateInput(value) {
  if (!value) return "";
  const parts = Object.fromEntries(
    inputDate
      .formatToParts(new Date(value))
      .map(({ type, value }) => [type, value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

export const fromDateInput = (value) =>
  new Date(`${value}:00+05:30`).toISOString();
