const SaleService = require('../services/sale.service');

const getAll = async (req, res) => {
  const { data } = await SaleService.getAll();
  res.status(200).json(data);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const { error, data } = await SaleService.getById(id);

  if (error) {
    return next(error);
  }
  res.status(200).json(data);
};

module.exports = {
  getAll,
  getById,
};
