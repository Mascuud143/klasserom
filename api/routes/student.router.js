const express = require("express");
const { join } = require("../controllers/student.controller");

const router = express.Router();

router.post("/join", register);

module.exports = router;
