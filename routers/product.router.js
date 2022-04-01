const express = require('express');
const ProductController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.getById);

module.exports = router;
