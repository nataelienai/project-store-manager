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

const create = async ({ name, quantity }) => {
  const product = await ProductModel.getByName(name);

  if (product) {
    return {
      error: { code: errorCodes.CONFLICT, message: 'Product already exists' },
    };
  }
  return { data: await ProductModel.create({ name, quantity }) };
};

const update = async ({ id, name, quantity }) => {
  const product = await ProductModel.getById(id);

  if (!product) {
    return {
      error: { code: errorCodes.NOT_FOUND, message: 'Product not found' },
    };
  }
  return { data: await ProductModel.update({ id, name, quantity }) };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
