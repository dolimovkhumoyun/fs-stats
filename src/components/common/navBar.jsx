import React from "react";
import { NavLink } from "react-router-dom";

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
              Statistics
            </NavLink>
          </li>
          <li className="nav-item ml-4">
            <NavLink className="nav-link" to="/search">
              Search
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
