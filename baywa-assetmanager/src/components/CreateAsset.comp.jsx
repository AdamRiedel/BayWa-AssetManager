import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import "./CreateAsset.style.css";

export default function CreateAsset() {
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

    switch (false) {
      case validator.matches(name.trim(), /^[a-zA-Z0-9äöüÄÖÜß ]{3,50}$/):
        setError("Name benötigt mindestens 3 Zeichen");
        break;
      // Im onCreateAsset switch-Statement hinzufügen:
      case Number.isInteger(parseFloat(rating)) &&
        parseFloat(rating) >= 0 &&
        parseFloat(rating) <= 5:
        setError("Bewertung muss eine Zahl zwischen 0 und 5 sein");
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
            name,
            type,
            description,
            serial,
            rating: parseFloat(rating),
            price: parseFloat(price),
          };

          setModal(false);
          setFormData({
            name: "",
            type: "",
            description: "",
            serial: "",
            rating: 0,
            price: 0,
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
              placeholder="Bewertung"
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
