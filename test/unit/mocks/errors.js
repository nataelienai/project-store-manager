const errorCodes = require('../../../services/errorCodes');

const requiredProductNameError = {
  code: errorCodes.BAD_REQUEST,
  message: '"name" is required',
}

const requiredProductIdError = {
  code: errorCodes.BAD_REQUEST,
  message: '"productId" is required',
}

const requiredQuantityError = {
  code: errorCodes.BAD_REQUEST,
  message: '"quantity" is required',
}

const productNameLengthError = {
  code: errorCodes.UNPROCESSABLE_ENTITY,
  message: '"name" length must be at least 5 characters long',
}

const quantityNumberError = {
  code: errorCodes.UNPROCESSABLE_ENTITY,
  message: '"quantity" must be greater than or equal to 1',
}

module.exports = {
  requiredProductNameError,
  requiredProductIdError,
  requiredQuantityError,
  productNameLengthError,
  quantityNumberError,
};
