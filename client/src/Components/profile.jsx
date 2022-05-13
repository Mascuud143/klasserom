import React from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";

export default function Profile({ profileUser, close }) {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="Profile">
      <div onClick={close} className="Profile-close">
        X
      </div>
      <div className="user-name">
        <div>👤</div>
        <div>{profileUser.username}</div>
      </div>
      <div className="user-type">{profileUser.type}</div>
      <div className="logout">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
