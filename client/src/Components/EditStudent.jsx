import React, { useEffect } from "react";
import "./EditStudent.css";

export default function EditStudent({ close, theClassId, student }) {
  console.log(student);

  function focusOnInput() {
    document.querySelector(".current-edit-student").focus();
  }

  useEffect(() => {
    focusOnInput();
  }, []);

  return (
    <div className="modal-edit-student">
      <div className="modal-edit-student-header">
        <div>
          Rediger {""}
          <div className="bold"> elev </div>
        </div>
        <div onClick={() => close()} className="modal-edit-student-close">
          X
        </div>
      </div>
      <div contentEditable="true" className="current-edit-student">
        {student}
      </div>
      <form action="#">
        <div className="edit-student-actions">
          <button
            style={{
              borderRadius: "50px",
              backgroundColor: "red",
              color: "white",
              width: "200px",
              padding: "15px",
            }}
          >
            Slett
          </button>
          <button
            style={{
              borderRadius: "50px",
              backgroundColor: "green",
              color: "white",
              width: "200px",
              padding: "15px",
              marginLeft: "20px",
            }}
          >
            Lagre
          </button>
        </div>
      </form>
    </div>
  );
}
