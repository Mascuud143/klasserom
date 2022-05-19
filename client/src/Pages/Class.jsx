import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { getStudents } from "../services/class.service";
import Nav from "./layout/Nav";
import NewStudent from "../Components/NewStudent";
import "./Class.css";
import Backdrop from "../Components/Backdrop";

export default function Class({ userClass }) {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [newStudentOpen, setNewStudentOpen] = useState(false);

  async function getStudentsData(user) {
    const token = localStorage.getItem("token");
    const userClasses = await getStudents(token, classId);
    console.log(userClasses);
    setStudents(userClasses.Students);
  }

  useEffect(() => {
    getStudentsData();
  }, []);

  function openStudentModal() {
    setNewStudentOpen(true);
  }

  function closeStudentModal() {
    setNewStudentOpen(false);
  }

  return (
    <div className="class">
      <Nav currentUser={userClass} />
      {newStudentOpen && (
        <NewStudent theClassId={classId} close={closeStudentModal} />
      )}
      {newStudentOpen && <Backdrop close={closeStudentModal} />}
      <div className="class-header">
        <h1>Klasse {classId}</h1>
        <Link to={`/classes/${classId}/groups`}>Prosjekter</Link>
      </div>
      <div className="students-list">
        {students.map((s) => {
          return (
            <div className="class-student" key={s.name}>
              {s.name}
            </div>
          );
        })}
      </div>

      <div className="leggtil-elev">
        <button onClick={openStudentModal}>Legg til elever +</button>
      </div>
    </div>
  );
}
