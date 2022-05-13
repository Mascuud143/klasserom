import React from "react";
import "./NewClass.css";
import { Link, useNavigate } from "react-router-dom";

import { createClass } from "../services/class.service";

export default function NewClass({ open, close }) {
  const navigate = useNavigate();
  const createClassHandler = async (e) => {
    e.preventDefault();
    const { name, school, room } = e.target;
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await createClass(token, {
      name: name.value,
      school: school.value,
      room: room.value,
    });

    navigate("/classes");
    console.log(res);
    close();
  };

  return (
    <div className="modal-form-class">
      <div className="modal-form-class-header">
        <div>
          <div className="bold"> Opprett Ny </div> *klasserom
        </div>
        <div onClick={() => close()} className="modal-form-class-close">
          X
        </div>
      </div>
      <form onSubmit={createClassHandler} action="#">
        <div>
          <label htmlFor="class-name">Klasse navn</label>
          <input id="class-name" type="text" name="name" />
        </div>

        <div>
          <label htmlFor="school">Skole</label>
          <input id="school" type="text" name="school" />
        </div>

        <div>
          <label htmlFor="room">Rom</label>
          <input id="room" type="text" name="room" />
        </div>

        <div>
          <button type="submit">Opprett</button>
        </div>
      </form>
    </div>
  );
}
