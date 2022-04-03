const express = require('express');
const rescue = require('express-rescue');
const SaleController = require('../controllers/sale.controller');
const saleValidationMiddleware = require('../middlewares/saleValidation');

const router = express.Router();

router.get('/', rescue(SaleController.getAll));

router.get('/:id', rescue(SaleController.getById));

router.post('/', saleValidationMiddleware, rescue(SaleController.create));

router.put('/:id', saleValidationMiddleware);

module.exports = router;
