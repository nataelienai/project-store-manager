const express = require('express');
const rescue = require('express-rescue');
const ProductController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', rescue(ProductController.getAll));

router.get('/:id', rescue(ProductController.getById));

module.exports = router;
