import { useEffect, useState } from "react";

export function useAPI(url, initLoading) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(initLoading);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const request = await fetch(url);
        if (!request.ok) throw new Error("failed to load API data");
        const data = await request.json();
        setData(data);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}
