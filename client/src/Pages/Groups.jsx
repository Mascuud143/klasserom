import React, { useEffect, useState } from "react";
import Nav from "./layout/Nav";
import "./Groups.css";

import { useParams, Link } from "react-router-dom";
import { getGroups } from "../services/class.service";
import { MdOutlineExpandMore } from "react-icons/md";

function getWeekNumber(date) {
  var d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
}

export default function Groups({ userClass }) {
  const { classId } = useParams();
  const [projects, setProjects] = useState([]);
  const [groups, setGroups] = useState([]);
  const [projectGroups, setProjectGroups] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    const token = localStorage.getItem("token");
    const projects = await getGroups(token, classId);
    setProjects(projects);
    //unpack and set group

    /*
  [
    {project:{title}, members:[]}
  ] 
*/
    console.log(projects);
    const groups = [];
    const projectGroups = projects.map((project, i) => {
      console.log(project);
      const g = {};
      g.project = project.project;
      g.project.week = getWeekNumber(project.project.createdAt);
      const members = [];
      g.members = project.Group_members;
      g.members = g.members.map((m) => {
        return m.memeberList.split(" ");
      });

      return g;
    });
    console.log(projectGroups);
    // console.log(groups);
    setGroups(projectGroups);
    setProjectGroups(projectGroups);
  }

  function toggleGroupBox(e) {
    e.preventDefault();
    const group = e.target.parentNode.parentNode;
    const groupsBox = group.querySelector(".class-groups");
    console.log(groupsBox);
    groupsBox.classList.toggle("hidden");
  }

  console.log(projectGroups);

  return (
    <div className="groups-page">
      <Nav currentUser={userClass} />
      <Link className="group-page-header" to={`/classes/${classId}/`}>
        <h2>{classId} - Projects </h2>
      </Link>
      <div className="groups-container">
        {projectGroups.length > 0
          ? projectGroups.map((project) => (
              <div className="group-box" key={project.project.id}>
                <div className="class-group-header">
                  <p className="project-title">{project.project.title}</p>
                  <p className="week-number">
                    Uka {project.project.week} -{" "}
                    {new Date(project.project.createdAt).getFullYear()}
                  </p>
                  <MdOutlineExpandMore onClick={toggleGroupBox} size={45} />
                </div>
                <div className="class-groups hidden">
                  {project.members.map((group, index) => (
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
              </div>
            ))
          : "There are no projects in this class"}
      </div>
    </div>
  );
}
