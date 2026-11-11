import { fromDateInput, toDateInput } from "./taskDates.js";

export const todayInIst = () => toDateInput(Date.now()).slice(0, 10);

export function shiftDay(day, amount) {
  const date = new Date(day);
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

export function mondayOf(day) {
  return shiftDay(day, -((new Date(day).getUTCDay() + 6) % 7));
}

export function dateRange(day, length) {
  // The API expects UTC, but the user's calendar day starts at midnight IST.
  return {
    weekStart: fromDateInput(day + "T00:00"),
    weekEndExclusive: fromDateInput(shiftDay(day, length) + "T00:00"),
  };
}
