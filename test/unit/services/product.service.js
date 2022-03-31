require('dotenv').config();
const { expect } = require('chai');
const sinon = require('sinon');
const ProductModel = require('../../../models/product.model');
const ProductService = require('../../../services/product.service');
const singleProduct = require('../mocks/singleProduct.json');
const multipleProducts = require('../mocks/multipleProducts.json');

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
