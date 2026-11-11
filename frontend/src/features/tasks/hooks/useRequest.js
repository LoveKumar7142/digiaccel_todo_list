import { useEffect, useState } from "react";

export default function useRequest(load, enabled = true, delay = 0) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const data = await load(controller.signal);
        if (!controller.signal.aborted) setResult({ load, data });
      } catch (error) {
        if (!controller.signal.aborted)
          setResult({ load, error: error.message });
      }
    }, delay);

    // A slower response from the previous search must not replace the current results.
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [load, enabled, delay]);

  if (!enabled) return { loading: false };
  if (result?.load !== load) return { loading: true };
  return result;
}
