const errorCodes = require('../../../services/errorCodes');

const saleNotFoundError = {
  code: errorCodes.NOT_FOUND,
  message: "Sale not found",
}

module.exports = saleNotFoundError;
