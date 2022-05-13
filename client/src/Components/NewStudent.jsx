import React from "react";
import "./NewStudent.css";
import { useParams } from "react-router-dom";

import { createStudent } from "../services/class.service";

export default function NewStudent({ close, theClassId }) {
  async function createNewStudent(e) {
    e.preventDefault();

    const name = e.target.name.value;
    console.log(name);
    const token = localStorage.getItem("token");
    const res = await createStudent(token, name, theClassId);

    window.location.reload();
  }

  return (
    <div className="modal-student">
      <div className="modal-student-header">
        <div>
          Legg til ny
          <div className="bold"> elev </div>
        </div>
        <div onClick={() => close()} className="modal-student-close">
          X
        </div>
      </div>
      <form onSubmit={createNewStudent} action="#">
        <input type="name" name="name" placeholder="skriv inn elev" />
        <button type="submit">Legge til</button>
      </form>
    </div>
  );
}
