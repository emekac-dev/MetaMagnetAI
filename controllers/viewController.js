const path = require("path");
const catchAsync = require("../utils/catchAsync");

exports.getDashboardView = catchAsync(async (req, res) => {
  if (!res.locals.user) {
    return res.redirect("/login");
  }
  const filePath = path.join(__dirname, "./../public/dashboard/dashboard.html");
  return res.status(200).sendFile(filePath);
});

exports.getResearchView = catchAsync(async (req, res) => {
  if (!res.locals.user) {
    return res.redirect("/login");
  }
  const filePath = path.join(__dirname, "./../public/research/research.html");
  return res.status(200).sendFile(filePath);
});

exports.getMetaResearchAIView = catchAsync(async (req, res) => {
  if (!res.locals.user) {
    return res.redirect("/login");
  }
  const filePath = path.join(
    __dirname,
    "./../public/meta-research-ai//MMAIResearchAssistant.html"
  );
  return res.status(200).sendFile(filePath);
});

exports.getLoginView = catchAsync(async (req, res) => {
  if (res.locals.user) {
    return res.redirect("/dashboard");
  }
  const filePath = path.join(__dirname, "./../public/login.html");

  return res.status(200).sendFile(filePath);
});

exports.getSignUpView = catchAsync(async (req, res) => {
  if (res.locals.user) {
    return res.redirect("/dashboard");
  }
  const filePath = path.join(__dirname, "./../public/signup/signup.html");

  return res.status(200).sendFile(filePath);
});

exports.logout = catchAsync(async (req, res) => {
  res.clearCookie("jwt"); // Replace 'yourCookieName' with the actual name of your cookie

  // Redirect to '/'
  res.redirect("/");
});
