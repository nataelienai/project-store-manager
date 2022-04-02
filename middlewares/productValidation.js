const errorCodes = require('../services/errorCodes');

const validateName = (name) => {
  if (!name) {
    return {
      error: {
        code: errorCodes.BAD_REQUEST,
        message: '"name" is required',
      },
    };
  }
  if (name.length < 5) {
    return {
      error: {
        code: errorCodes.UNPROCESSABLE_ENTITY,
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  return {};
};

const validateQuantity = (quantity) => {
  if (!quantity && quantity !== 0) {
    return {
      error: {
        code: errorCodes.BAD_REQUEST,
        message: '"quantity" is required',
      },
    };
  }
  if (quantity < 1) {
    return {
      error: {
        code: errorCodes.UNPROCESSABLE_ENTITY,
        message: '"quantity" must be greater than or equal to 1',
      },
    };
  }
  return {};
};

const productValidation = (req, _res, next) => {
  const { name, quantity } = req.body;
  const nameValidation = validateName(name);

  if (nameValidation.error) {
    return next(nameValidation.error);
  }

  const quantityValidation = validateQuantity(quantity);

  if (quantityValidation.error) {
    return next(quantityValidation.error);
  }
  next();
};

module.exports = productValidation;
