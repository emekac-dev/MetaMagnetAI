// This module exports a higher-order function that wraps an asynchronous function (fn).
// It is commonly used in Express.js applications to handle errors in async route handlers or middleware.
// The wrapper ensures that any errors thrown during the execution of the async function
// are caught and passed to the `next` function, which triggers the Express error-handling middleware.

module.exports = (fn) => {
  return (req, res, next) => {
    // Execute the async function (fn) with the current request, response, and next objects.
    // If the function throws an error or a rejected promise is encountered, catch the error
    // and pass it to the `next` function.
    fn(req, res, next).catch((err) => next(err));
  };
};
