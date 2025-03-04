import { useNavigate } from "react-router-dom";
import "./Home.style.css";

export function Home() {
  const navigate = useNavigate();

  const handleNavigateToAssets = () => {
    navigate("/assets");
  };

  return (
    <>
      <main>
        <div className="title-container">
          <h1>
            <span className="title-top">Geräteverwaltung</span>
            <span className="title-bottom">auf einem neuen Level</span>
          </h1>
        </div>
        <a href="#cta-section" className="scroll-down">
          <div className="scroll-arrow"></div>
        </a>
        <p className="text-one">
          Effizientes Asset-Management war noch nie so einfach! Mit dem BayWa
          Asset-Manager behalten Sie jederzeit den Überblick über Ihre Artikel,
          Geräte und Anlagen. Unsere benutzerfreundliche Oberfläche ermöglicht
          es Ihnen, Assets schnell zu erfassen, zu verwalten und zu
          aktualisieren – alles an einem zentralen Ort.
        </p>
        <p className="text-two">
          🔹 Artikelliste verwalten – Durchsuchen Sie Ihre Bestände bequem über
          eine übersichtliche Tabelle oder nutzen Sie die leistungsstarke
          Suchfunktion. <br />
          🔹 Artikel anlegen & aktualisieren – Erfassen Sie neue Artikel mühelos
          und bearbeiten Sie bestehende Assets mit nur wenigen Klicks. <br />
          🔹 Smarte Navigation – Dank einer klar strukturierten Oberfläche
          finden Sie sich intuitiv zurecht.
        </p>
        <p className="text-three">
          Starten Sie jetzt und optimieren Sie Ihr Asset-Management mit BayWa!
          🚀
        </p>
        <div id="cta-section">
          <button onClick={handleNavigateToAssets} className="cta-button">
            Zu den Assets →
          </button>
        </div>
      </main>
    </>
  );
}
