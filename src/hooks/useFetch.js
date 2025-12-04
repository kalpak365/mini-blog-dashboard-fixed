import { useEffect, useState } from "react";

export function useFetch(url, options = {}) {
  const [data, setData] = useState(options.initialData ?? null);
  const [loading, setLoading] = useState(options.skip ? false : true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url || options.skip) return;

    let ignore = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Request failed with ${res.status}`);
        const json = await res.json();
        if (!ignore) setData(json);
      })
      .catch((err) => {
        if (!ignore) setError(err.message || "Something went wrong");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [url, options.skip]);

  return { data, loading, error, setData };
}
