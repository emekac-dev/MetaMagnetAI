const express = require("express");
const { signup, checkAuth, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check-auth", checkAuth);

module.exports = router;
