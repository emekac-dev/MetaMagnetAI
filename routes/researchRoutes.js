const express = require("express");
const { findResearchTopics } = require("./../controllers/researchController");

const router = express.Router();

router.post("/search", findResearchTopics);

module.exports = router;
