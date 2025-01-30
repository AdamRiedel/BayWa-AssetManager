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
          <div className="navbar-items">
            <a href="/">Home</a>
            <a href="/">Assets</a>
            <a href="/">+ Neues Asset</a>
          </div>
        </nav>
      </header>
    </>
  );
}
