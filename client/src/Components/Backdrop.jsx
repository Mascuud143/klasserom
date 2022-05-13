import React from "react";
import "./Backdrop.css";

export default function Backdrop({ close }) {
  return <div onClick={close} className="modal-backdrop"></div>;
}
