const SaleModel = require('../models/sale.model');
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

const create = async (saleProducts) => ({ data: await SaleModel.create(saleProducts) });

const update = async (id, saleProducts) => ({ data: await SaleModel.update(id, saleProducts) });

module.exports = {
  getAll,
  getById,
  create,
  update,
};
