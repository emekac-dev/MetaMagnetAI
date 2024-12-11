const AppError = require("./../utils/appError");

// Sends detailed error information during development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status, // HTTP status ('error' or 'fail')
    error: err, // Entire error object for debugging
    message: err.message, // Error message for clarity
    errorStack: err.stack, // Stack trace for pinpointing issues
  });
};

// Sends limited error information during production to avoid exposing sensitive data
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    // Operational errors are handled gracefully
    res.status(err.statusCode).json({
      status: err.status, // Status indicating 'fail' or 'error'
      message: err.message, // User-friendly message
    });
  } else {
    // For unexpected errors, log for debugging and send generic message
    console.error(`error 💥 ${err}`);
    res.status(500).json({
      status: "error", // General error status
      message: "Something went wrong", // Avoid exposing internal details
    });
  }
};

// Global error handling middleware for Express.js
module.exports = (err, req, res, next) => {
  // Set default error values if not provided
  err.statusCode = err.statusCode || 500; // Default to HTTP 500 Internal Server Error
  err.status = err.status || "error"; // Default to 'error' status

  // Shallow copy of error object for immutability and further modification
  let error = ({ name, message, statusCode, status, isOperational, stack } =
    err);

  if (process.env.NODE_ENV == "development") {
    // Use detailed error response in development
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV == "production") {
    // Use simplified error response in production
    sendErrorProd(error, res);
  }
};
