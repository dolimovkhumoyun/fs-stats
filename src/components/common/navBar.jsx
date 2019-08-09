import React from "react";
import { NavLink } from "react-router-dom";

function handleLogout(e) {
  e.preventDefault();
  localStorage.removeItem("token");
  window.location = "./";
}

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <span className="navbar-brand mb-0 h1">FizmaSoft</span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-4">
          <li className="nav-item ml-4">
            <NavLink className="nav-link " to="/dashboard" disabled>
              Статистика
            </NavLink>
          </li>
          <li className="nav-item ml-4">
            <NavLink className="nav-link" to="/search">
              Қидирув
            </NavLink>
          </li>
        </ul>

        <span
          className="navbar-text ml-auto text-white logout "
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          Чиқиш
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
