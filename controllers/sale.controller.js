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

const create = async (req, res, next) => {
  const { data, error } = await SaleService.create(req.body);

  if (error) return next(error);

  res.status(201).json(data);
};

const update = async (req, res) => {
  const { data } = await SaleService.update(req.params.id, req.body);
  res.status(200).json(data);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const { error } = await SaleService.deleteById(id);

  if (error) {
    return next(error);
  }
  res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
