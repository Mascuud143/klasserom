import React, { useState } from "react";
import "./Nav.css";
import logo from "../../logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import Profile from "../../Components/profile";

export default function Nav({ currentUser }) {
  const [profileOpen, setProfileOpen] = React.useState(false);

  function closeProfile() {
    setProfileOpen(false);
  }
  function openProfile() {
    setProfileOpen(true);
  }
  return (
    <nav>
      {profileOpen && (
        <Profile close={closeProfile} profileUser={currentUser} />
      )}
      <div className="logo">
        <Link to="/Dashboard">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="profile">
        {currentUser && currentUser.type == "TEACHER" && (
          <Link className="nav-element" to="/classes">
            Klasser
          </Link>
        )}
        <p>
          <AiFillSetting onClick={openProfile} size={40} />
        </p>
      </div>
    </nav>
  );
}
