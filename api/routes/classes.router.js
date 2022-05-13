const express = require("express");
const {
  createClass,
  getClass,
  getClasses,
  generateKlassekode,
} = require("../controllers/classes.controller");
const {
  getStudents,
  createStudent,
} = require("../controllers/student.controller");
const { protect, restrictTo } = require("../util/auth");

const router = express.Router();

router
  .post("/", protect, createClass)
  .get("/:id", protect, getClass)
  .get("/", protect, getClasses)
  .get("/:id/students", protect, restrictTo("TEACHER"), getStudents)
  .post("/:id/students", protect, restrictTo("TEACHER"), createStudent);

module.exports = router;
