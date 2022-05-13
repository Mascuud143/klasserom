import "../App.css";
import "./Home.css";
import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "../logo.png";
function Home() {
  return (
    <div className="container-page">
      <div className="logo-home">
        <img src={logo} alt="logo" />
      </div>
      <div className="options">
        <Link className="link" to="/students">
          For elever
        </Link>
        <Link className="link link-outline" to="/teachers">
          For lærere
        </Link>
      </div>
    </div>
  );
}

export default Home;
