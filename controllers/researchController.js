const path = require("path");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.findResearchTopics = catchAsync(async (req, res, next) => {
  const { topic, year, field, region } = req.body;

  if (!topic) {
    console.log("hmmr");
    return next(new AppError("Topic is required.", 400));
  }

  const activity = `Search: "${topic}" | Year: ${year || "Any"} | Field: ${
    field || "Any"
  } | Region: ${region || "Any"}`;
  //   recentActivities.push(activity);

  res.json({ activity });
});
