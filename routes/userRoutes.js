const express = require("express");
const { findResearchTopics } = require("../controllers/researchController");
const {
  getUserData,
  getMe,
  getUser,
} = require("../controllers/userController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);
router.get("/me", getMe, getUser);
router.get("/", getUserData);

module.exports = router;
