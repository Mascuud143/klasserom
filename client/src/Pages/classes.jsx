import React, { useEffect, useState } from "react";
import { getClasses } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./layout/Nav";
import "./Classes.css";
import { FaUser, FaMap } from "react-icons/fa";

export default function Classes({ user }) {
  const [classes, setclasses] = useState([]);

  async function getUserData(user) {
    const token = localStorage.getItem("token");
    const userClasses = await getClasses(token);
    console.log(userClasses);
    setclasses(userClasses);
  }
  console.log(classes);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="classes">
      <Nav currentUser={user} />
      <div className="your-classes">
        <div className="your-classes-header">
          <FaUser />
          <p>
            Dine <span className="bold">klasser</span>
          </p>
        </div>
      </div>
      <div className="classes-list">
        {classes.map((classroom, id) => (
          <Link to={classroom.name} key={id}>
            {classroom.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
