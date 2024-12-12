const path = require("path");
const catchAsync = require("../utils/catchAsync");

exports.getDashboardVeiw = catchAsync(async (req, res) => {
  const filePath = path.join(__dirname, "./../public/dashboard/dashboard.html");
  return res.status(200).sendFile(filePath);
});
exports.getResearchVeiw = catchAsync(async (req, res) => {
  const filePath = path.join(__dirname, "./../public/research/research.html");
  return res.status(200).sendFile(filePath);
});
