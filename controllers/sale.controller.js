const SaleService = require('../services/sale.service');

const getAll = async (req, res) => {
  const { data } = await SaleService.getAll();
  res.status(200).json(data);
};

module.exports = {
  getAll,
};
