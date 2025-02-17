import { useParams, useNavigate } from "react-router-dom"; // useNavigate hinzugefügt
import { useAPI } from "../hooks/useAPI.hook";
import "./AssetDetail.styles.css";
import { StarRating } from "./StarRating.comp";

export default function AssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Navigation-Hook
  const {
    data: assetResponse,
    loading,
    error,
  } = useAPI(`http://localhost:3000/assets/${id}`, true);

  // Handler für den Zurück-Button
  const handleBack = () => {
    navigate("/assets");
  };

  if (loading) return <div>Lädt...</div>;
  if (error) return <div>Error: Ein Fehler ist aufgetreten</div>;
  if (!assetResponse) return <div>Asset nicht gefunden</div>;

  // Extrahiere das erste Asset aus der Response
  const asset = Array.isArray(assetResponse) ? assetResponse[0] : assetResponse;

  return (
    <div className="asset-detail">
      <button onClick={handleBack} className="back-button">
        ← Zurück zu Assets
      </button>
      <div className="content-wrapper">
        <div className="image-container">
          <img
            src={asset.imgUrl || "https://picsum.photos/500/750"}
            alt={asset.name || "Asset Bild"}
          />
        </div>
        <div className="info-container">
          <h1 className="info-title">{asset.name || "Kein Name verfügbar"}</h1>
          <div className="tag-container">
            <span className="tag">{asset.type || "Kein Typ"}</span>
          </div>
          <div className="pricing">
            {asset.price && (
              <>
                <span className="info-pricing">{asset.price}</span>
                <span className="info-currency">{asset.currency}</span>
              </>
            )}
          </div>
          <div className="rating">
            {asset.rating ? (
              <StarRating rating={Number(asset.rating)} />
            ) : (
              <span>Keine Bewertung verfügbar</span>
            )}
          </div>
          <div className="serial">
            <span>Serial: {asset.serial || "Keine Seriennummer"}</span>
          </div>
          <div className="description">
            <p className="info-text">
              {asset.description || "Keine Beschreibung verfügbar"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
