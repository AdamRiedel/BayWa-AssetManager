import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useParams entfernt
import { useAPI } from "../hooks/useAPI.hook";
import { TYPE_TRANSLATIONS } from "../constants/translations";
import "./CreateAsset.style.css";

export default function EditAsset({ assetId, onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    rating: "",
    price: "",
    currency: "€",
  });

  const {
    data: asset,
    isLoading,
    error,
    updateAsset,
  } = useAPI(`http://localhost:3000/assets/${assetId}`, true);

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name || "",
        type: asset.type || "",
        description: asset.description || "",
        rating: asset.rating,
        price: asset.price,
        currency: asset.currency || "€",
      });
    }
  }, [asset]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Direkte Verwendung der assetId ohne weitere Modifikation
      await updateAsset(assetId, formData);
      onClose();
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Assets:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (name === "rating") {
      parsedValue = Math.min(Math.max(parseFloat(value) || 0, 0), 5);
    } else if (name === "price") {
      parsedValue = Math.max(parseFloat(value) || 0, 0);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  if (isLoading)
    return (
      <div className="modal-overlay">
        <div className="modal">Laden...</div>
      </div>
    );
  if (error)
    return (
      <div className="modal-overlay">
        <div className="modal">Fehler: {error}</div>
      </div>
    );

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h3>Asset bearbeiten</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />

          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Typ auswählen</option>
            {Object.entries(TYPE_TRANSLATIONS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Beschreibung"
            required
          />

          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Bewertung"
            required
          />

          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.1"
            value={formData.price}
            onChange={handleChange}
            placeholder="Preis"
            required
          />

          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            required
          >
            <option value="EUR">€</option>
            <option value="USD">$</option>
          </select>

          <button type="submit" className="button-modal">
            Speichern
          </button>
          <button
            type="button"
            className="button-modal"
            onClick={onClose}
            style={{ backgroundColor: "var(--baywa-stone-grey-600)" }}
          >
            Abbrechen
          </button>
        </form>
      </div>
    </div>
  );
}
