const errorCodes = require('../services/errorCodes');

const validateProductId = (productId) => {
  if (!productId) {
    return {
      error: {
        code: errorCodes.BAD_REQUEST,
        message: '"productId" is required',
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

const saleValidation = (req, _res, next) => {
  const [{ productId, quantity }] = req.body;
  const productIdValidation = validateProductId(productId);

  if (productIdValidation.error) {
    return next(productIdValidation.error);
  }

  const quantityValidation = validateQuantity(quantity);

  if (quantityValidation.error) {
    return next(quantityValidation.error);
  }
  next();
};

module.exports = saleValidation;
