import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Assets.style.css";
import { TYPE_TRANSLATIONS } from "../constants/translations";
import { useAPI } from "../hooks/useAPI.hook";

export default function Assets() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // GET /assets Hook
  const {
    data: assets,
    isLoading,
    error,
  } = useAPI("http://localhost:3000/assets", true);

  const handleAssetClick = (assetId) => {
    navigate(`/asset/${assetId}`);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const filteredAssets =
    assets?.filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.type.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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
            <th>Typ</th>
            <th>Beschreibung</th>
            <th>Bewertung</th>
            <th className="currency-column">Preis</th>
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
              <td>{TYPE_TRANSLATIONS[asset.type]}</td>
              <td>{asset.description}</td>
              <td>{parseFloat(asset.rating).toFixed(1)}</td>
              <td className="currency-column">
                {asset.price} {asset.currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
