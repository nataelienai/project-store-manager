const express = require('express');
const rescue = require('express-rescue');
const SaleController = require('../controllers/sale.controller');

const router = express.Router();

router.get('/', rescue(SaleController.getAll));

router.get('/:id', rescue(SaleController.getById));

module.exports = router;
