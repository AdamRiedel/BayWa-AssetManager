export function NavBar(color) {
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
          </div>
          <button>
            <img src="./src/assets/plus.svg" alt="" />
            <h3>Neues Asset</h3>
          </button>
        </nav>
      </header>
    </>
  );
}
