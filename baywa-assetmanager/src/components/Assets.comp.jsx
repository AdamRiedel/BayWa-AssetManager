import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Assets.style.css";
import { TYPE_TRANSLATIONS } from "../constants/translations.js";
import { useAPI } from "../hooks/useAPI.hook";
import EditAsset from "./EditAsset.comp.jsx";

export default function Assets() {
  const {
    data: assets,
    isLoading,
    error,
    reload,
    deleteAsset,
  } = useAPI("http://localhost:3000/assets", true);

  useEffect(() => {
    reload();
  }, [reload]);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState(null);

  const handleAssetClick = (assetId) => {
    navigate(`/asset/${assetId}`);
  };

  const handleEditClick = (e, assetId) => {
    e.stopPropagation();
    setSelectedAssetId(assetId);
  };

  const handleDeleteClick = async (e, assetId) => {
    e.stopPropagation();
    if (window.confirm("Möchten Sie dieses Asset wirklich löschen?")) {
      try {
        await deleteAsset(assetId);
        reload();
      } catch (error) {
        console.error("Fehler beim Löschen:", error);
        alert("Das Asset konnte nicht gelöscht werden.");
      }
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleEditClose = () => {
    setSelectedAssetId(null);
    reload();
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
      {selectedAssetId && (
        <EditAsset assetId={selectedAssetId} onClose={handleEditClose} />
      )}

      <button onClick={handleHomeClick} className="back">
        ← Zurück zur Startseite
      </button>

      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        placeholder="Assets suchen..."
      />

      <table className="assets-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Typ</th>
            <th>Beschreibung</th>
            <th>Bewertung</th>
            <th>Preis</th>
            <th>Aktionen</th>
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
              <td>
                {asset.price} {asset.currency}
              </td>
              <td className="action-buttons">
                <button
                  onClick={(e) => handleEditClick(e, asset.id)}
                  className="edit-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => handleDeleteClick(e, asset.id)}
                  className="delete-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
