const express = require("express");
const { findResearchTopics } = require("../controllers/researchController");
const { getUserData } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUserData);

module.exports = router;
