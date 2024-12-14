const userData = require("../dev-data/userData.json");
const Search = require("../models/searchModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getUserData = catchAsync(async (req, res) => {
  const { params } = req;
  const { id } = params;
  const user = await User.findOne({ _id: id }).select(
    "-passwordChangedAt -__v -role"
  );
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const activities = await Search.find({ user: id }).sort({
    searchTimestamp: -1,
  });

  // Extract activities and filter out duplicates
  const uniqueActivities = [
    ...new Set(activities.map((val) => val.activity)),
  ].slice(0, 5);
  const topicsCount = activities.filter((val) => val.fromClick).length;

  res.status(200).json({
    status: "success",
    data: {
      name: user.firstName + " " + user.lastName,
      topicsCount: topicsCount,
      reportsCount: 0,
      trendsCount: 0,
      activities: uniqueActivities,
    },
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
