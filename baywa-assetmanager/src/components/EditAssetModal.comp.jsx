import { useState, useRef } from "react";
import "./EditAssetModal.styles.css";
import { TYPE_TRANSLATIONS } from "../constants/translations";

export function EditAssetModal({ asset, onClose, onSave }) {
  const [editedAsset, setEditedAsset] = useState(asset);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedAsset({ ...editedAsset, imgUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      setError("Bitte wählen Sie eine gültige Bilddatei aus.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/assets/${editedAsset.id}`,
        {
          method: "POST",
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
          <div className="form-group">
            <label>Bewertung:</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={editedAsset.rating || 0}
              onChange={(e) =>
                setEditedAsset({
                  ...editedAsset,
                  rating: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Bild:</label>
            <div
              className={`image-upload-area ${isDragging ? "dragging" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              {editedAsset.imgUrl ? (
                <div className="image-preview">
                  <img
                    src={editedAsset.imgUrl}
                    alt="Vorschau"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                    }}
                  />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditedAsset({ ...editedAsset, imgUrl: null });
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <span>Klicken oder Bild hierher ziehen</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              style={{ display: "none" }}
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
