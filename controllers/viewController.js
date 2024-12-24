const path = require("path");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const AppError = require("../utils/appError");

exports.renderView = async (req, res, next, viewName, data = {}) => {
  try {
    // Dynamically construct the file path
    const filePath = path.join(
      __dirname,
      `./../public/${viewName}/${viewName}.html`
    );

    // Read the HTML file as a string
    fs.readFile(filePath, "utf-8", (err, html) => {
      if (err) {
        return next(new AppError("Error loading the page", 500));
      }

      // Replace placeholders in the HTML with dynamic data
      const processedHtml = html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] || ""; // Replace with data value or empty string if key not found
      });

      // Send the processed HTML as the response
      res.status(200).send(processedHtml);
    });
  } catch (error) {
    return next(new AppError("Error loading the page", 500));
  }
};

exports.getDashboardView = catchAsync(async (req, res, next) => {
  if (!res.locals.user) {
    return res.redirect("/login");
  }

  exports.renderView(req, res, next, "dashboard", {
    firstName: res.locals.user["firstName"],
  });
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
