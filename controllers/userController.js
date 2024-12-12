const userData = require("../dev-data/userData.json");
const catchAsync = require("../utils/catchAsync");

exports.getUserData = catchAsync(async (req, res) => {
  return res.json({
    name: userData.name,
    topicsCount: userData.topicsCount,
    reportsCount: userData.reportsCount,
    trendsCount: userData.trendsCount,
    activities: userData.activities,
  });
});
