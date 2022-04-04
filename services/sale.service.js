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

const updateQuantities = async (products, operateFn) => {
  await Promise.all(
    products.map(async (product) => {
      const { id, name, quantity } = await ProductModel.getById(product.productId);

      await ProductModel.update({ id, name, quantity: operateFn(quantity, product.quantity) });
    }),
  );
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

  await updateQuantities(saleProducts, (totalQuantity, saleQuantity) => (
    totalQuantity - saleQuantity
  ));
  return { data: await SaleModel.create(saleProducts) };
};

const update = async (id, saleProducts) => ({ data: await SaleModel.update(id, saleProducts) });

const deleteById = async (id) => {
  const saleProducts = await SaleModel.getById(id);

  if (!saleProducts) {
    return {
      error: { code: errorCodes.NOT_FOUND, message: 'Sale not found' },
    };
  }

  await updateQuantities(saleProducts, (totalQuantity, saleQuantity) => (
    totalQuantity + saleQuantity
  ));
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
