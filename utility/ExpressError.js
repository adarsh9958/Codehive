class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message || 'An error occurred';
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
// This class extends the built-in Error class to create a custom error type