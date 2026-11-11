const apiBase = (import.meta.env.VITE_API_BASE_URL || "/api").replace(
  /\/$/,
  "",
);

async function request(path, { method = "GET", body, signal } = {}) {
  const response = await fetch(`${apiBase}/tasks${path}`, {
    method,
    signal,
    headers:
      body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    throw new Error(
      result?.message || "Could not complete the request. Try again.",
    );
  }

  return result.data;
}

export const getWeeklySummary = (signal) =>
  request("/weekly-summary", { signal });

export function getTasks({ search, week, signal }) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (week) {
    params.set("from", week.weekStart);
    params.set("to", week.weekEndExclusive);
  }

  const query = params.toString();
  return request(query ? `?${query}` : "", { signal });
}

export const createTask = (body) => request("", { method: "POST", body });
export const updateTask = (id, body) =>
  request(`/${encodeURIComponent(id)}`, { method: "PATCH", body });
export const deleteTask = (id) =>
  request(`/${encodeURIComponent(id)}`, { method: "DELETE" });
