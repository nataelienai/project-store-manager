const ProductModel = require('../models/product.model');
const errorCodes = require('./errorCodes');

const getAll = async () => ({ data: await ProductModel.getAll() });

const getById = async (id) => {
  const product = await ProductModel.getById(id);

  if (!product) {
    return {
      error: { code: errorCodes.NOT_FOUND, message: 'Product not found' },
    };
  }
  return { data: product };
};

module.exports = {
  getAll,
  getById,
};
