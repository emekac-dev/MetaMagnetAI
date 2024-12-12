const express = require("express");
const {
  getDashboardVeiw,
  getResearchVeiw,
} = require("../controllers/viewController");

const router = express.Router();

router.get("/dashboard", getDashboardVeiw); //dashboard view
router.get("/research", getResearchVeiw); //dashboard view

module.exports = router;
