import { NavBar } from "./NavBar.comp";
import "./Home.style.css";

export function Home() {
  return (
    <>
      <NavBar />
      <main>
        <h1>Willkommen zum BayWa Asset-Manager</h1>
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
      </main>
    </>
  );
}
