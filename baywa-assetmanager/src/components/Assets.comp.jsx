import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Assets.style.css";
import { TYPE_TRANSLATIONS } from "../constants/translations";
import { EditAssetModal } from "./EditAssetModal.comp";

export default function Assets() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAsset, setEditingAsset] = useState(null);

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

  const handleEdit = (e, asset) => {
    e.stopPropagation();
    setEditingAsset(asset);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Möchten Sie dieses Asset wirklich löschen?")) {
      try {
        const response = await fetch(`http://localhost:3000/assets/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Fehler beim Löschen des Assets");
        }

        setAssets(assets.filter((asset) => asset.id !== id));
      } catch (err) {
        console.error("Fehler beim Löschen:", err);
      }
    }
  };

  const handleSaveEdit = async (editedAsset) => {
    try {
      const response = await fetch(
        `http://localhost:3000/assets/${editedAsset.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedAsset),
        }
      );

      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Assets");
      }

      setAssets(
        assets.map((asset) =>
          asset.id === editedAsset.id ? editedAsset : asset
        )
      );
      setEditingAsset(null);
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
    }
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
            <th>Typ</th>
            <th>Beschreibung</th>
            <th>Bewertung</th>
            <th className="currency-column">Preis</th>
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
              <td className="currency-column">
                {asset.price} {asset.currency}
              </td>
              <td className="actions-column">
                <button
                  onClick={(e) => handleEdit(e, asset)}
                  className="edit-button"
                >
                  Bearbeiten
                </button>
                <button
                  onClick={(e) => handleDelete(e, asset.id)}
                  className="delete-button"
                >
                  Löschen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingAsset && (
        <EditAssetModal
          asset={editingAsset}
          onClose={() => setEditingAsset(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
