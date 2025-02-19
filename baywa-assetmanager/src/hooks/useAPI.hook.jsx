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

  const createAsset = async (newAsset) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAsset),
      });

      if (!response.ok) throw new Error("Failed to create asset");

      const createdAsset = await response.json();
      setData([...data, createdAsset]);
      return createdAsset;
    } catch (error) {
      setError(true);
      console.log(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateAsset = async (id, updatedAsset) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAsset),
      });

      if (!response.ok) throw new Error("Failed to update asset");

      const updatedAsset = await response.json();
      setData(data.map((asset) => (asset.id === id ? updatedAsset : asset)));
      return updatedAsset;
    } catch (error) {
      setError(true);
      console.log(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAsset = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to delete asset");

      setData(data.filter((asset) => asset.id !== id));
      return true;
    } catch (error) {
      setError(true);
      console.log(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    createAsset,
    updateAsset,
    deleteAsset,
  };
}
