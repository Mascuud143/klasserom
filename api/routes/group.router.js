const express = require("express");
const { register, login, me } = require("../controllers/user.controller");
const { restrictTo, protect } = require("../util/auth");

const router = express.Router();

router.post("/", protect, register);
module.exports = router;
