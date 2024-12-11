const path = require("path");
const userData = require("../dev-data/userData.json");
const catchAsync = require("../utils/catchAsync");

exports.getDashboardVeiw = catchAsync(async (req, res) => {
  const filePath = path.join(__dirname, "../public/dashboard/dashboard.html");
  return res.status(200).sendFile(filePath);
});

exports.getUserData = catchAsync(async (req, res) => {
  return res.json({
    name: userData.name,
    topicsCount: userData.topicsCount,
    reportsCount: userData.reportsCount,
    trendsCount: userData.trendsCount,
    activities: userData.activities,
  });
});
