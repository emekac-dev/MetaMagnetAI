const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_PASSWORD, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
};

const createSendToken = (user, statusCode, res, showUser) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.TOKEN_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV == "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  return res.status(statusCode).json({
    status: "Success",
    token,
    data: showUser
      ? {
          user,
        }
      : undefined,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    passwordChangedAt,
    fieldOfStudy,
  } = req.body;
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    fieldOfStudy,
    passwordConfirm,
    passwordChangedAt,
  }); //remove password changed at
  newUser.password = undefined;

  createSendToken(newUser, 201, res, true);
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(" email or password required", 404));
  }

  const user = await User.findOne({ email, active: { $eq: true } }).select(
    "+password"
  );
  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const isCorrectPassword = await user.isCorrectPassword(password);

  if (!isCorrectPassword) {
    return next(new AppError("Incorrect email or password", 401));
  }
  user.password = undefined;

  createSendToken(user, 200, res);
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.TOKEN_PASSWORD
    );

    const currentUser = await User.findOne({
      _id: decoded.id,
      active: { $eq: true },
    });
    if (!currentUser) {
      return next();
    }
    //user changed password after jwt
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    return next(); //grant access
  }
  next();
});

exports.checkAuth = async (req, res) => {
  const token = req.cookies.jwt; // Assume JWT is stored in HttpOnly cookie
  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }

  try {
    // Validate the JWT
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.TOKEN_PASSWORD
    );

    res.json({ loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(401).json({ loggedIn: false });
  }
};

exports.protect = catchAsync(async (req, res, next) => {
  //get token
  const { headers } = req;
  let token;
  if (headers.authorization && headers.authorization.startsWith("Bearer")) {
    token = headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Please sign to gain access", 401));
  }
  //validatetoken
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.TOKEN_PASSWORD
  );
  //user still exist
  const currentUser = await User.findOne({
    _id: decoded.id,
    active: { $eq: true },
  });
  if (!currentUser) {
    return next(new AppError("the user does not longer exit", 401));
  }
  //user changed password after jwt
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "the user password has been changed. Please log in again",
        401
      )
    );
  }

  req.user = currentUser;
  next(); //grant access
});
