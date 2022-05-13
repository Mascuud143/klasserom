const express = require("express");
const { register, login, me } = require("../controllers/user.controller");
const { restrictTo, protect } = require("../util/auth");

const router = express.Router();

router.post("/register", protect, restrictTo("ADMIN"), register);
router.post("/login", login);
router.get("/me", protect, me);
module.exports = router;
