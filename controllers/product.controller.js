const ProductService = require('../services/product.service');

const getAll = async (req, res) => {
  const products = await ProductService.getAll();
  res.status(200).json(products);
};

module.exports = {
  getAll,
};
