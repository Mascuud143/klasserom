import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NewClassMap.css";

export default function NewClassMap({ open, close, classes }) {
  const navigate = useNavigate();

  function createClassMapHandler(e) {
    e.preventDefault();
  }

  return (
    <div className="modal-form-map">
      <div className="modal-form-map-header">
        <div>
          <div className="bold"> Opprett Nytt </div> *klassekart
        </div>
        <div onClick={() => close()} className="modal-form-map-close">
          X
        </div>
      </div>
      <form onSubmit={createClassMapHandler} action="#">
        <div>
          <div>
            <label htmlFor="class-name">Klasse</label>
            <select name="classes" id="classes">
              {classes.map((classroom) => (
                <option key={classroom.id} value="individ">
                  {classroom.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="setup">Setup</label>
            <select name="setup" id="">
              <option value="individ">Individ</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
