const errorCodes = require('../../../services/errorCodes');

const productNotFoundError = {
  code: errorCodes.NOT_FOUND,
  message: "Product not found",
}

module.exports = productNotFoundError;
