const express = require('express');
const rescue = require('express-rescue');
const ProductController = require('../controllers/product.controller');
const productValidationMiddleware = require('../middlewares/productValidation');

const router = express.Router();

router.get('/', rescue(ProductController.getAll));

router.get('/:id', rescue(ProductController.getById));

router.post('/', productValidationMiddleware, rescue(ProductController.create));

router.put('/:id', productValidationMiddleware);

module.exports = router;
