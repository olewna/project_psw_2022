import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreProvider";

export default function Navbar() {
  const { logged } = useStore();
  return (
    <nav
      className="navbar navbar-dark bg-dark"
      aria-label="First navbar example"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold ">
          <h1 className="mx-5">Gamer CaVe</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample01"
          aria-controls="navbarsExample01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample01">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/food" className="btn btn-dark text-warning">
                FOOD
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/music" className="btn btn-dark text-success">
                MUSIC
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/games" className="btn btn-dark text-danger">
                GAMES
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="btn btn-dark text-info">
                {logged.type === "" ? <div>LOG IN</div> : <div>ACCOUNT</div>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
