import { NavLink } from "react-router-dom";
import CreateAsset from "./CreateAsset.comp.jsx";
import "./NavBar.style.css";
import { useAPI } from "../hooks/useAPI.hook.jsx";

export function NavBar() {
  const { reload } = useAPI("http://localhost:3000/assets", true);

  const handleAssetCreated = async () => {
    await reload();
  };

  return (
    <>
      <header>
        <nav>
          <a
            href="https://www.baywa.de/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./src/assets/baywa-logo-small.svg" alt="BayWa-Logo" />
          </a>
          <div className="items-container">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/assets"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Assets
            </NavLink>
            <div className="button-container">
              <CreateAsset onAssetCreated={handleAssetCreated} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
