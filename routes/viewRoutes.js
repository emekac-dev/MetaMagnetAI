const express = require("express");
const { getDashboardVeiw } = require("../controllers/DashboardController");

const router = express.Router();

router.get("/dashboard", getDashboardVeiw); //dashboard view

module.exports = router;
