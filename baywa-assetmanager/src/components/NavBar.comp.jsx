import { NavLink } from "react-router-dom";
import CreateAsset from "./CreateAsset.comp.jsx";
import "./NavBar.style.css";

export function NavBar() {
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
              <CreateAsset />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
