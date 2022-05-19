import React, { useEffect, useState } from "react";
import Nav from "./layout/Nav";
import "./Groups.css";

import { useParams } from "react-router-dom";
import { getGroups } from "../services/class.service";
import { MdOutlineExpandMore } from "react-icons/md";

export default function Groups({ userClass }) {
  const { classId } = useParams();
  const [projects, setProjects] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    const token = localStorage.getItem("token");
    const projects = await getGroups(token, classId);
    setProjects(projects);
    console.log(projects);
    //unpack and set group
    const groups = [];
    projects.map((project) => {
      console.log(project.Group_members);
      project.Group_members.map((m) => {
        groups.push(m.memeberList.split(" "));
      });
    });

    console.log(groups);
    setGroups(groups);
  }

  function toggleGroupBox(e) {
    e.preventDefault();
    const group = e.target.parentNode.parentNode;
    const groupsBox = group.querySelector(".class-groups");
    console.log(groupsBox);
    groupsBox.classList.toggle("hidden");
  }

  return (
    <div className="groups">
      <Nav currentUser={userClass} />
      <h1>Projects</h1>
      <div className="groups-container">
        {projects.map((project) => (
          <div className="group-box" key={project.id}>
            <div className="class-group-header">
              <p className="project-title">{project.project.title}</p>

              <MdOutlineExpandMore onClick={toggleGroupBox} size={40} />
            </div>
            <div className="class-groups hidden">
              {groups.map((group, index) => (
                <div className="class-group">
                  <p className="class-group-title">Group {index + 1}</p>
                  <div className="class-group-members">
                    {group.map((member) => (
                      <div className="class-group-member">{member}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* 
            <div className="class-groups">
              <div className="class-group">
                <p className="class-group-title">Group 1</p>
                <div className="class-group-members">
                  <div className="class-group-member">Ibsa</div>
                  <div className="class-group-member">Mascuud</div>
                </div>
              </div>
              <div className="class-group">
                <p className="class-group-title">Group 1</p>
                <div className="class-group-members">
                  <div className="class-group-member">Ibsa</div>
                  <div className="class-group-member">Mascuud</div>
                </div>
              </div>
              <div className="class-group">
                <p className="class-group-title">Group 1</p>
                <div className="class-group-members">
                  <div className="class-group-member">Ibsa</div>
                  <div className="class-group-member">Mascuud</div>
                </div>
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
