const SaleModel = require('../models/sale.model');

const getAll = async () => ({ data: await SaleModel.getAll() });

module.exports = {
  getAll,
};
