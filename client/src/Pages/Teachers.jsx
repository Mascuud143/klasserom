import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import "./Teachers.css";
import logo from "../logo.png";

import { authLogin } from "../services/auth.js";

export default function Teachers() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/Dashboard");
    }
  }, []);

  async function login(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    console.log(username, password);

    const token = await authLogin(username, password);
    console.log(token);

    if (token) {
      //store token in localstorage
      localStorage.setItem("token", token.token);
      navigate("/Dashboard");
    } else {
      setError("Feil brukernavn eller passord");
    }
  }

  return (
    <div className="container-page">
      {error && <p className="error">{error}</p>}
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
          Logg inn som <span className="bold">lærer</span>
        </div>
        <form onSubmit={login} className="form-login" action="#">
          <input
            className="link link-outline"
            id="username"
            type="text"
            name="username"
            placeholder="Brukernavn"
          />
          <input
            className="link link-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Passord"
          />
          <button className="link btn-link" type="submit">
            Log inn
          </button>
        </form>
      </div>
    </div>
  );
}
