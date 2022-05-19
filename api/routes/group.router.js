const express = require("express");
const { createGroup } = require("../controllers/group.controller");
const { restrictTo, protect } = require("../util/auth");

const router = express.Router();

router.post("/", protect, createGroup);
module.exports = router;
