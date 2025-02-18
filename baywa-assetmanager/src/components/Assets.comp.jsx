import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Assets.style.css";

export default function Assets() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await fetch("http://localhost:3000/assets");
      if (!response.ok) {
        throw new Error("Failed to fetch assets");
      }
      const data = await response.json();
      setAssets(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const updateAssetStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/assets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update asset status");
      }

      setAssets(
        assets.map((asset) =>
          asset.id === id ? { ...asset, status: newStatus } : asset
        )
      );
    } catch (err) {
      console.error("Error updating asset status:", err);
    }
  };

  const handleAssetClick = (assetId) => {
    navigate(`/asset/${assetId}`);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="assets-container">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        placeholder="Assets suchen..."
      />

      <button onClick={handleHomeClick} className="back">
        ← Zurück zur Startseite
      </button>

      <table className="assets-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((asset) => (
            <tr
              key={asset.id}
              onClick={() => handleAssetClick(asset.id)}
              className="asset-row"
            >
              <td>{asset.name}</td>
              <td>{asset.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
