import { useState } from "react";
import "./EditAssetModal.styles.css";
import { TYPE_TRANSLATIONS } from "../constants/translations";

export function EditAssetModal({ asset, onClose, onSave }) {
  const [editedAsset, setEditedAsset] = useState(asset);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
        throw new Error(
          `Fehler beim Speichern: ${response.status} ${response.statusText}`
        );
      }

      const updatedAsset = await response.json();
      onSave(updatedAsset);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Asset bearbeiten</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={editedAsset.name}
              onChange={(e) =>
                setEditedAsset({ ...editedAsset, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Typ:</label>
            <select
              value={editedAsset.type}
              onChange={(e) =>
                setEditedAsset({ ...editedAsset, type: e.target.value })
              }
            >
              {Object.keys(TYPE_TRANSLATIONS).map((type) => (
                <option key={type} value={type}>
                  {TYPE_TRANSLATIONS[type]}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Beschreibung:</label>
            <textarea
              value={editedAsset.description}
              onChange={(e) =>
                setEditedAsset({ ...editedAsset, description: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Preis:</label>
            <input
              type="number"
              value={editedAsset.price}
              onChange={(e) =>
                setEditedAsset({ ...editedAsset, price: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Währung:</label>
            <input
              type="text"
              value={editedAsset.currency}
              onChange={(e) =>
                setEditedAsset({ ...editedAsset, currency: e.target.value })
              }
            />
          </div>
          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? "Wird gespeichert..." : "Speichern"}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
