import React, { useState, useEffect, useRef } from "react";
import "./Group.css";
import { Link, useNavigate } from "react-router-dom";
import { saveGroups } from "../services/class.service";
import { MdGroups } from "react-icons/md";

export default function Group({ open, close, classes }) {
  const navigate = useNavigate();
  const [currentClass, setCurrentClass] = useState(classes[0].name);
  const [students, setStudents] = useState([...classes[0].Students]);
  const [groups, setGroups] = useState([]);
  const [groupDisplay, setGroupDisplay] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");

  // useEffect(()=>{
  //   setCurrentClass(classes[0].name);
  // },[])
  async function createGroup(e) {
    e.preventDefault();
    //token, title, members, className

    //unpack groups
    let groupMembers = groups.map((group) => {
      return group.map((member) => {
        return member.name;
      });
    });
    console.log(groupMembers);

    const token = localStorage.getItem("token");
    if (groups.length > 1) {
      console.log(groups);
      const newGroups = await saveGroups(
        token,
        projectTitle,
        groupMembers,
        currentClass
      );
    }

    navigate(`/classes/${currentClass}/groups`);
  }

  const randomizeHandler = (e) => {
    e.preventDefault();
    const numberOfGroups = parseInt(e.target.antall.value);

    const shuffled = shuffle([...students]);

    const groups = createGroups(shuffled, numberOfGroups);
    setGroups(groups);
    console.log(groups);
    setProjectTitle(e.target.title.value);
    //set group display to true
    setGroupDisplay(true);
  };

  const createGroups = (s, n) => {
    const groups = [];
    for (var i = 0; i < s.length; i += n) {
      groups.push(s.slice(i, i + n));
    }

    return groups;
  };

  function displayGroups() {
    if (groups.length > 1) {
      return (
        <div className="groups">
          {groups.map((group, index) => {
            return (
              <div key={index} className="group">
                <div className="group-title">Group {index + 1}</div>
                <div className="group-members">
                  {group.map((student) => {
                    return (
                      <div
                        key={student.name}
                        draggable
                        className="group-member"
                      >
                        {student.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  //shuffle students
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const classChangeHandler = (e) => {
    setCurrentClass(e.target.value);

    //update current students
    const c = classes.find((c) => c.name === e.target.value);
    setStudents(c.Students);
  };

  return (
    <div className="modal-form-group">
      <div className="modal-form-group-header">
        <div className="modal-form-group-header-title">
          <div className="bold"> Opprett Nytt </div> *gruppeoppsett
        </div>
        <div onClick={() => close()} className="modal-form-group-close">
          X
        </div>
        <div className="save-groups">
          <button onClick={createGroup}>Lagre</button>
        </div>
      </div>
      <form onSubmit={randomizeHandler} action="#">
        <div className="group-options">
          <div>
            <label htmlFor="class-name">Klasse</label>
            <select onChange={classChangeHandler} name="classes" id="classes">
              {classes.map((classroom) => (
                <option key={classroom.id} value={classroom.name}>
                  {classroom.name}
                </option>
              ))}
            </select>
            <div>
              <label htmlFor="project-title">Prosjekt tittel</label>
              <input
                placeholder="Tittel av oppgaven"
                name="title"
                id="project-title"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="antall-gruppe">antall grupper</label>
              <input
                placeholder="3"
                name="antall"
                id="antall-grupper"
                type="text"
              />
            </div>

            <button type="submit">Randomize</button>
          </div>
        </div>
      </form>

      {groupDisplay && (
        <main className="group-display">
          <div className="group-project-title">#{projectTitle}</div>

          {displayGroups()}
        </main>
      )}
    </div>
  );
}
