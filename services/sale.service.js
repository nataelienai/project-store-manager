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

module.exports = {
  getAll,
  getById,
};
