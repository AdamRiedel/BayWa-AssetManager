import { useState } from "react";
import validator from "validator";
import { useAPI } from "../hooks/useAPI.hook.jsx";
import "./CreateAsset.style.css";

export default function CreateAsset() {
  const { createAsset, error: apiError } = useAPI(
    "http://localhost:3000/assets"
  );
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [formdata, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    serial: "",
    rating: "",
    price: "",
  });

  const onTriggerModal = () => {
    setModal(!modal);
  };

  const onInputChange = (event) => {
    const stateProp = event.target.name;
    const value = event.target.value;
    setFormData({ ...formdata, [stateProp]: value });
  };

  const onCreateAsset = async (event) => {
    event.preventDefault();
    const { name, type, description, serial, rating, price } = formdata;

    // Hilfsfunktion zur Validierung von Dezimalzahlen
    const isValidDecimal = (value) => {
      const num = parseFloat(value);
      return !isNaN(num) && isFinite(num);
    };

    switch (false) {
      case validator.matches(name.trim(), /^[a-zA-Z0-9äöüÄÖÜß ]{3,50}$/):
        setError("Name benötigt mindestens 3 Zeichen");
        break;
      case isValidDecimal(rating) &&
        parseFloat(rating) >= 0 &&
        parseFloat(rating) <= 5:
        setError("Bewertung muss eine Dezimalzahl zwischen 0 und 5 sein");
        break;
      case isValidDecimal(price) && parseFloat(price) >= 0:
        setError("Preis muss eine positive Dezimalzahl sein");
        break;
      case validator.matches(serial.trim(), /^[A-Z0-9]{3,10}$/):
        setError(
          "Seriennummer muss 3-10 Zeichen lang sein (nur Großbuchstaben und Zahlen)"
        );
        break;
      default:
        setError("");
        try {
          const newAsset = {
            name: name.trim(),
            type,
            description: description.trim(),
            serial: serial.trim(),
            rating: parseFloat(rating).toFixed(1),
            price: parseFloat(price).toFixed(1),
          };

          await createAsset(newAsset);
          setModal(false);
          setFormData({
            name: "",
            type: "",
            description: "",
            serial: "",
            rating: "",
            price: "",
          });
        } catch (error) {
          setError("Fehler beim Erstellen des Assets");
        }
        break;
    }
  };

  return (
    <>
      {modal && (
        <div className="modal">
          <h3>Neues Asset erstellen</h3>
          <form>
            <input
              onChange={onInputChange}
              placeholder="Name"
              value={formdata.name}
              type="text"
              name="name"
            />
            <select onChange={onInputChange} value={formdata.type} name="type">
              <option value="">Typ auswählen</option>
              <option value="book">Buch</option>
              <option value="hardware">Hardware</option>
              <option value="license">Lizenz</option>
              <option value="accessorie">Zubehör</option>
              <option value="consumable">Verbrauchsmaterial</option>
              <option value="component">Komponente</option>
            </select>
            <input
              onChange={onInputChange}
              placeholder="Beschreibung"
              value={formdata.description}
              type="text"
              name="description"
            />
            <input
              onChange={onInputChange}
              placeholder="Seriennummer"
              value={formdata.serial}
              type="text"
              name="serial"
            />
            <input
              onChange={onInputChange}
              placeholder="Bewertung (0-5)"
              value={formdata.rating}
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rating"
            />
            <input
              onChange={onInputChange}
              placeholder="Preis"
              value={formdata.price}
              type="number"
              step="0.1"
              min="0"
              name="price"
            />
            <button onClick={onCreateAsset}>Erstellen</button>
            {error && <p className="error">{error}</p>}
          </form>
          <button className="modal-close" onClick={onTriggerModal}>
            X
          </button>
        </div>
      )}
      <button className="trigger-modal button-modal" onClick={onTriggerModal}>
        + Neues Asset
      </button>
    </>
  );
}
