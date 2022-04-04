const SaleModel = require('../models/sale.model');
const ProductModel = require('../models/product.model');
const errorCodes = require('./errorCodes');

const getAll = async () => ({ data: await SaleModel.getAll() });

const getById = async (id) => {
  const sale = await SaleModel.getById(id);

  if (!sale) {
    return {
      error: { code: errorCodes.NOT_FOUND, message: 'Sale not found' },
    };
  }
  return { data: sale };
};

const validateQuantities = async (products) => {
  const productsHaveStock = await Promise.all(
    products.map(ProductModel.hasEnoughStock),
  );
  return productsHaveStock.every((productHasStock) => productHasStock);
};

const create = async (saleProducts) => {
  const productsHaveStock = await validateQuantities(saleProducts);

  if (!productsHaveStock) {
    return {
      error: {
        code: errorCodes.UNPROCESSABLE_ENTITY,
        message: 'Such amount is not permitted to sell',
      },
    };
  }

  return { data: await SaleModel.create(saleProducts) };
};

const update = async (id, saleProducts) => ({ data: await SaleModel.update(id, saleProducts) });

const deleteById = async (id) => {
  const sale = await SaleModel.getById(id);

  if (!sale) {
    return {
      error: { code: errorCodes.NOT_FOUND, message: 'Sale not found' },
    };
  }
  await SaleModel.deleteById(id);
  return {};
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
