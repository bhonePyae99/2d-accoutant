import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom border-light">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          2D-Accoutant
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/details" className="nav-link">
                စာရင်းမှတ်တမ်းများ
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/totals" className="nav-link">
          <button className="btn btn-info">စုစုပေါင်း</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
