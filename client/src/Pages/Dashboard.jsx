import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { FaUser, FaMap } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { AiFillSetting } from "react-icons/ai";
import { MdGroups } from "react-icons/md";

import Backdrop from "../Components/Backdrop";
import NewClass from "../Components/NewClass";
import Nav from "./layout/Nav";
import NewClassMap from "../Components/NewClassMap";
import Group from "../Components/Group";
import { getClasses } from "../services/class.service";
import { getUser } from "../services/auth";

export default function Dashboard() {
  const [classModalOpen, setclassModalOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [classMapModalOpen, setclassMapModalOpen] = useState(false);
  const [classes, setclasses] = useState([]);

  const navigate = useNavigate();

  const closeClassModal = () => {
    setclassModalOpen(!classModalOpen);
  };
  const closeClassMapModal = () => {
    setclassMapModalOpen(!classMapModalOpen);
  };
  const closeGroupModal = () => {
    setGroupModalOpen(!groupModalOpen);
  };

  console.log(localStorage.getItem("token"));

  //get clasess
  async function getClassesData(user) {
    const token = localStorage.getItem("token");
    const userClasses = await getClasses(token);
    console.log(userClasses);
    setclasses(userClasses);
  }

  useEffect(() => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      navigate("/");
    }

    getClassesData();
  }, []);

  return (
    <div className="dashboard">
      <Nav />
      {classMapModalOpen && (
        <NewClassMap classes={classes} close={closeClassMapModal} />
      )}
      {classModalOpen && (
        <NewClass open={classModalOpen} close={closeClassModal} />
      )}
      {groupModalOpen && (
        <Group
          classes={classes}
          open={groupModalOpen}
          close={closeGroupModal}
        />
      )}
      {classModalOpen && (
        <Backdrop open={classModalOpen} close={closeClassModal} />
      )}
      {classMapModalOpen && (
        <Backdrop open={classMapModalOpen} close={closeClassMapModal} />
      )}
      {groupModalOpen && (
        <Backdrop open={groupModalOpen} close={closeGroupModal} />
      )}

      <main>
        <div className="dashboard-btns">
          <Link onClick={closeClassMapModal} to="/Dashboard">
            <button>
              <FaMap size={70} to="/Dashboard" />
              Nytt klassekart
            </button>
          </Link>
          <Link onClick={closeClassModal} to="/Dashboard">
            <button>
              <BsPeopleFill size={70} />
              Ny klasse
            </button>
          </Link>
          <Link onClick={closeGroupModal} to="/Dashboard">
            <button>
              <MdGroups size={70} />
              Nytt gruppeoppsett
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
