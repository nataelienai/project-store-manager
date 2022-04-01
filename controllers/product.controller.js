const ProductService = require('../services/product.service');

const getAll = async (req, res) => {
  const products = await ProductService.getAll();
  res.status(200).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductService.getById(id);

  if (product.error) {
    return next(product.error);
  }
  res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
};
