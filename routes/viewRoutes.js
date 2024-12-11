const express = require("express");
const { getDashboardVeiw } = require("./../controllers/dashboardController");

const router = express.Router();

router.get("/dashboard", getDashboardVeiw); //dashboard view

module.exports = router;
