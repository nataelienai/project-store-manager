const errorCodes = require('../services/errorCodes');

module.exports = (err, _req, res, _next) => {
  const statusCodeByError = {
    [errorCodes.NOT_FOUND]: 404,
    [errorCodes.BAD_REQUEST]: 400,
    [errorCodes.UNPROCESSABLE_ENTITY]: 422,
  };

  const statusCode = statusCodeByError[err.code] || 500;

  if (statusCode === 500) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  res.status(statusCode).json({ message: err.message });
};
