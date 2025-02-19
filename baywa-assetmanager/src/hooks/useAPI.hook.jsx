import { useEffect, useState } from "react";

export function useAPI(url, initLoading) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(initLoading);
  const [error, setError] = useState(false);

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

  useEffect(() => {
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

  const updateAsset = async (id, updatedAssetData) => {
    try {
      setLoading(true);
      const formattedData = {
        ...updatedAssetData,
        rating: parseFloat(updatedAssetData.rating).toFixed(1),
        price: parseFloat(updatedAssetData.price).toFixed(1),
      };

      const updateUrl = url.endsWith(`/${id}`) ? url : `${url}/${id}`;
      const response = await fetch(updateUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Fehler beim Aktualisieren des Assets"
        );
      }

      const result = await response.json();
      setData(data.map((asset) => (asset.id === id ? result : asset)));
      return result;
    } catch (error) {
      setError(error.message);
      console.error("Update Fehler:", error);
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
    reload: getData,
  };
}
