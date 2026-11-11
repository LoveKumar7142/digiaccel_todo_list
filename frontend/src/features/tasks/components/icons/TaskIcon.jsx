const icons = {
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M16 3v4M8 3v4M3 11h18M8 16h2m4 0h2" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M17.5 2.5a2.12 2.12 0 0 1 3 3L11 15l-4 1 1-4 9.5-9.5z" /></>,
  trash: <><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M10 11v6m4-6v6" /></>,
  search: <><circle cx="7.5" cy="7.5" r="5.75" /><path d="m12 12 3 3" /></>,
  plus: <path d="M9 2.22v13.56M2.22 9h13.56" />,
  close: <path d="m3 3 10 10M13 3 3 13" />,
  back: <path d="m12 3-7 7 7 7" />,
  completed: <><rect x="1.5" y="1.5" width="17" height="17" rx="2" /><path d="m5 10 3 3 7-8" /></>,
  pending: <><rect x="1.5" y="1.5" width="17" height="17" rx="2" /><path d="m5 5 10 10M15 5 5 15" /></>,
};

const geometry = {
  search: [17, 1.5],
  plus: [18, 2.04],
  close: [16, 1.5],
  back: [20, 2],
  completed: [20, 1.5],
  pending: [20, 1.5],
};

export default function TaskIcon({ name }) {
  const [size, strokeWidth] = geometry[name] ?? [24, 2];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      {icons[name]}
    </svg>
  );
}
