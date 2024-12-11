// This module defines a custom error class `AppError` that extends the built-in `Error` class in JavaScript.
// It is commonly used in Express.js applications to handle application-specific errors consistently
// and to differentiate between operational errors (e.g., invalid user input) and programming errors.

// The `AppError` class adds additional properties to the standard `Error` object, such as `statusCode`, `status`,
// and `isOperational`, making it easier to handle errors in a structured way in the application.

class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent class constructor to set the `message` property.

    this.statusCode = statusCode; // HTTP status code for the error (e.g., 404 for Not Found, 500 for Internal Server Error).
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // Sets the status to 'fail' for client errors (4xx) and 'error' for server errors (5xx).

    this.isOperational = true;
    // Indicates that this error is operational (e.g., expected errors like invalid input or missing data)
    // rather than a programming or unknown error.

    Error.captureStackTrace(this, this.constructor);
    // Captures the stack trace for debugging purposes, excluding this constructor call from the stack.
    // This is helpful for pinpointing where the error originated in the application code.
  }
}

module.exports = AppError;
// Exports the `AppError` class to be used throughout the application for creating and handling custom errors.
