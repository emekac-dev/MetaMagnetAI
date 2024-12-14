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

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = catchAsync(async ({ params }, res, next) => {
  const { id } = params;
  const user = await User.findOne({ _id: id }).select(
    "-passwordChangedAt -__v -role"
  );

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});
