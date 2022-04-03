const SaleService = require('../services/sale.service');

const getAll = async (_req, res) => {
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

const create = async (req, res) => {
  const { data } = await SaleService.create(req.body);
  res.status(201).json(data);
};

module.exports = {
  getAll,
  getById,
  create,
};
