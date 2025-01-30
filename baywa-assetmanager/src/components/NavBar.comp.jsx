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
            <a href="/">Home</a>
            <a href="/">Assets</a>
            <div className="button-container">
              <a className="button" href="/">
                + Neues Asset
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
