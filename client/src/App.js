import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getUser } from "./services/auth";
import React, { useState, useEffect } from "react";

//Components
import Home from "./Pages//Home";
import Teachers from "./Pages/Teachers";
import Students from "./Pages/Students";
import Dashboard from "./Pages/Dashboard";
import Classes from "./Pages/classes";
import Class from "./Pages/Class";
import Nav from "./Pages/layout/Nav";
import Admin from "./Pages/Admin";

function App() {
  const [user, setUser] = useState({});

  async function getUserData() {
    const token = localStorage.getItem("token");
    const currentUser = await getUser(token);
    setUser(currentUser);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/students" element={<Students />} />
        <Route path="/Dashboard" element={<Dashboard userCurrent={user} />} />
        <Route path="/classes" element={<Classes user={user} />} />
        <Route path="/classes/:classId" element={<Class userClass={user} />} />
        <Route path="/admin" element={<Admin userClass={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
