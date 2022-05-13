import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import logo from "../logo.png";

function Students() {
  function joinClassHandler(e) {
    e.preventDefault();

    const code = e.target.code.value;
  }

  return (
    <div className="container-page">
      <header className="home-header">
        <div>
          <Link className="link-prev" to="/">
            Tilbake
          </Link>
        </div>
        <div className="logo-login">
          <img src={logo} alt="logo" />
        </div>
      </header>
      <div className="login-skjema">
        <div className="header">
          Skriv inn <span className="bold">klassekode</span>
        </div>
        <form action="#">
          <input
            className="link link-outline"
            id="klassekode"
            type="text"
            name="code"
            placeholder="klasse kode"
          />

          <button className="link btn-link" type="submit">
            Bli med
          </button>
        </form>
      </div>
    </div>
  );
}

export default Students;
