const ProductService = require('../services/product.service');

const getAll = async (req, res) => {
  const { data } = await ProductService.getAll();
  res.status(200).json(data);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const { error, data } = await ProductService.getById(id);

  if (error) {
    return next(error);
  }
  res.status(200).json(data);
};

module.exports = {
  getAll,
  getById,
};
