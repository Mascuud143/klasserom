import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { getStudents } from "../services/class.service";
import { getGroups } from "../services/class.service";
import Nav from "./layout/Nav";
import NewStudent from "../Components/NewStudent";
import EditStudent from "../Components/EditStudent";
import "./Class.css";
import Backdrop from "../Components/Backdrop";
import {
  MdOutlineExpandMore,
  MdOutlineWhatshot,
  MdPersonAdd,
} from "react-icons/md";

function getWeekNumber(date) {
  var d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
}

function toggleGroupBox(e) {
  e.preventDefault();
  const group = e.target.parentNode.parentNode.parentNode;
  const groupsBox = group.querySelector(".class-class-groups");
  groupsBox.classList.toggle("hidden");
}

export default function Class({ userClass }) {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [school, setSchool] = useState("");
  const [newStudentOpen, setNewStudentOpen] = useState(false);
  const [editStudentOpen, setEditStudentOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [groups, setGroups] = useState([]);
  const [projectGroups, setProjectGroups] = useState([]);
  const [recentProject, setRecentProject] = useState({});
  const [currentEditStudent, setCurrentEditStudent] = useState("");

  const navigate = useNavigate();

  async function getStudentsData(user) {
    const token = localStorage.getItem("token");
    const userClasses = await getStudents(token, classId);
    console.log(userClasses);
    setStudents(userClasses.Students);
    setSchool(userClasses.school);
  }

  useEffect(() => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      navigate("/");
    }
    console.log("hhhh");
    getStudentsData();
    getProjects();
  }, []);

  async function getProjects() {
    const token = localStorage.getItem("token");
    const projects = await getGroups(token, classId);
    setProjects(projects);

    console.log(projects);
    const groups = [];
    const projectGroupData = projects.map((project, i) => {
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

    setGroups(projectGroupData);
    setProjectGroups(projectGroupData);
    console.log(projectGroupData.length - 1);
    console.log(projectGroups);
    console.log(recentProject);

    if (projectGroupData.length > 0 && projectGroupData.length !== 1) {
      setRecentProject(projectGroupData[projectGroupData.length - 1]);
    } else if (projectGroupData.length === 1) {
      setRecentProject(projectGroupData[0]);
    } else {
      setRecentProject([]);
    }

    // setRecentProject(projectGroupData.arr.slice(-1)[0]);
  }

  function openStudentModal() {
    setNewStudentOpen(true);
  }

  function closeStudentModal(e) {
    setNewStudentOpen(false);
  }

  function closeEditStudentModal() {
    setEditStudentOpen(false);
  }

  function openEditStudentModal(e) {
    setEditStudentOpen(true);
    setCurrentEditStudent(e.target.textContent);
  }

  return (
    <div className="class">
      <Nav currentUser={userClass} />
      {newStudentOpen && (
        <NewStudent theClassId={classId} close={closeStudentModal} />
      )}
      {editStudentOpen && (
        <EditStudent
          student={currentEditStudent}
          theClassId={classId}
          close={closeEditStudentModal}
        />
      )}
      {newStudentOpen && <Backdrop close={closeStudentModal} />}
      {editStudentOpen && <Backdrop close={closeEditStudentModal} />}
      <div className="class-header">
        <h1>Klasse {classId}</h1>
        <p>{school}</p>
        <Link to={`/classes/${classId}/groups`}>Prosjekter</Link>
      </div>
      <div className="leggtil-elev">
        <button onClick={openStudentModal}>
          Legg til elever <MdPersonAdd />
        </button>
      </div>
      <div className="class-main">
        <div className="students-list">
          {students.length > 0
            ? students.map((s) => {
                return (
                  <div
                    onClick={openEditStudentModal}
                    className="class-student"
                    key={s.name}
                  >
                    {s.name}
                  </div>
                );
              })
            : "LOADING... studenter"}
        </div>
        {(recentProject.hasOwnProperty("project") && (
          <div className="recent-project">
            <div className="class-group-box">
              <div className="class-group-header">
                <p className="class-project-title">
                  {recentProject.project.title}
                </p>
                <p className="class-week-number">
                  Uka {recentProject.project.week} -{" "}
                  {new Date(recentProject.project.createdAt).getFullYear()}
                </p>
                <MdOutlineExpandMore onClick={toggleGroupBox} size={45} />
              </div>
              <div className="class-class-groups hidden">
                {recentProject.members.map((group, index) => (
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
            <h4 className="recent-project-header">
              <MdOutlineWhatshot /> Recent project
            </h4>
          </div>
        )) ||
          "Your recent project will appear here"}
      </div>
      {/* <div className="leggtil-elev">
        <button onClick={openStudentModal}>Legg til elever +</button>
      </div> */}
    </div>
  );
}
