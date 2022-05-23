import "../App.css";
import "./Home.css";
import "./index.css";
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import logo from "../logo.png";
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/Dashboard");
    }
  }, []);

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
