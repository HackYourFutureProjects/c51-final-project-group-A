import { useEffect, useState } from "react";
import useFetch from "./useFetch";

export default function useCategories(trigger) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { performFetch, cancelFetch } = useFetch("/items", (data) => {
    if (data.success) {
      const items = data.result;
      const categorySet = new Set();
      items.forEach((item) => {
        if (item.category) {
          categorySet.add(item.category);
        }
      });
      setCategories([...categorySet]);
    } else {
      setError(data.msg || "Failed to load categories");
    }
    setLoading(false);
  });

  useEffect(() => {
    if (trigger) {
      setLoading(true);
      setError(null);
      performFetch();
    }
    return cancelFetch;
  }, [trigger]);

  return { categories, loading, error };
}
