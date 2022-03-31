require('dotenv').config();
const { expect } = require('chai');
const sinon = require('sinon');
const ProductModel = require('../../../models/product.model');
const ProductService = require('../../../services/product.service');

describe('ProductService', () => {
  describe('#getAll()', () => {
    context('when the database is empty', () => {
      before(() => {
        sinon.stub(ProductModel, 'getAll').resolves([]);
      });

      after(() => {
        ProductModel.getAll.restore();
      });

      it('returns an empty array', async () => {
        const products = await ProductService.getAll();
        expect(products).to.be.an('array').that.is.empty;
      });
    });

    context('when the database has a single product', () => {
      const singleProduct = [{ id: 1, name: 'Martelo', quantity: 10 }];

      before(() => {
        sinon.stub(ProductModel, 'getAll').resolves(singleProduct);
      });

      after(() => {
        ProductModel.getAll.restore();
      });

      it('returns an array with one product', async () => {
        const products = await ProductService.getAll();
        expect(products).to.deep.equal(singleProduct);
      });
    });

    context('when the database has multiple products', () => {
      const multipleProducts = [
        { id: 1, name: 'Martelo', quantity: 10 },
        { id: 2, name: 'Prego', quantity: 20 },
        { id: 3, name: 'Parafuso', quantity: 30 },
      ];

      before(() => {
        sinon.stub(ProductModel, 'getAll').resolves(multipleProducts);
      });

      after(() => {
        ProductModel.getAll.restore();
      });

      it('returns an array with multiple products', async () => {
        const products = await ProductService.getAll();
        expect(products).to.deep.equal(multipleProducts);
      });
    });
  });
});
