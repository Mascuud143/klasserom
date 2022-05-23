const express = require("express");
const {
  createClass,
  getClass,
  getClasses,
  generateKlassekode,
} = require("../controllers/classes.controller");

const { createGroup, getGroups } = require("../controllers/group.controller");
const {
  getStudents,
  createStudent,
  deleteStudent,
} = require("../controllers/student.controller");
const { protect, restrictTo } = require("../util/auth");

const router = express.Router();

router
  .post("/", protect, createClass)
  .get("/:id", protect, getClass)
  .get("/", protect, getClasses)
  .get("/:id/students", protect, restrictTo("TEACHER"), getStudents)
  .post("/:id/students", protect, restrictTo("TEACHER"), createStudent)
  .delete("/:id/students", protect, restrictTo("TEACHER"), deleteStudent)
  .post("/:id/groups", protect, restrictTo("TEACHER"), createGroup)
  .get("/:id/groups", protect, restrictTo("TEACHER"), getGroups);

module.exports = router;
