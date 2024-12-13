const express = require("express");
const {
  getDashboardView,
  getResearchView,
  getLoginView,
  getSignUpView,
  logout,
} = require("../controllers/viewController");
const { isLoggedIn } = require("../controllers/authController");

const router = express.Router();
router.use(isLoggedIn);

router.get("/dashboard", getDashboardView); //dashboard view
router.get("/research", getResearchView); //dashboard view

router.get("/login", getLoginView);
router.get("/signup", getSignUpView);
router.get("/logout", logout);

module.exports = router;
