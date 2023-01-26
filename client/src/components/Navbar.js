import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark p-3 mb-3 bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold ">
          <h2>Gamer CaVe</h2>
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/food" className="btn btn-dark">
              FOOD
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/login" className="btn btn-dark">
              {logged.type === "" ? <div>Log in</div> : <div>Account</div>}
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
