const ProductModel = require('../models/product.model');

const getAll = async () => ProductModel.getAll();

module.exports = {
  getAll,
};
