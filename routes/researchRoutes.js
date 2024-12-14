const express = require("express");
const {
  findResearchTopics,
  generateResearchTopics,
} = require("./../controllers/researchController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);
router.post("/search", findResearchTopics);
router.get("/suggestions", generateResearchTopics);

module.exports = router;
