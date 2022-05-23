import React, { useState, useEffect } from "react";
import "./Nav.css";
import logo from "../../logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import Profile from "../../Components/profile";
import { getUser } from "../../services/auth";
export default function Nav() {
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({});

  async function getUserData() {
    const token = localStorage.getItem("token");
    const currentUser = await getUser(token);
    setCurrentUser(currentUser);
  }

  useEffect(() => {
    getUserData();
  }, []);

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
          <div>
            <Link className="nav-element" to="/classes">
              Klasser
            </Link>
          </div>
        )}
        {currentUser && currentUser.type == "ADMIN" && (
          <div>
            <Link className="nav-element" to="/admin">
              create user
            </Link>
          </div>
        )}
        {}
        <p>
          <AiFillSetting onClick={openProfile} size={40} />
        </p>
      </div>
    </nav>
  );
}
