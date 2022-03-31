require('dotenv').config();
const { expect } = require('chai');
const sinon = require('sinon');
const ProductService = require('../../../services/product.service');
const ProductController = require('../../../controllers/product.controller');
const singleProduct = require('../mocks/singleProduct.json');
const multipleProducts = require('../mocks/multipleProducts.json');

describe('ProductController', () => {
  describe('#getAll()', () => {
    context('when the database is empty', () => {
      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getAll').resolves([]);
      });

      after(() => {
        ProductService.getAll.restore();
      });

      it('responds with HTTP status code 200 OK', async () => {
        await ProductController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('responds with an empty array', async () => {
        await ProductController.getAll(request, response);
        expect(response.json.calledWith([])).to.be.true;
      });
    });

    context('when the database has a single product', () => {
      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getAll').resolves(singleProduct);
      });

      after(() => {
        ProductService.getAll.restore();
      });

      it('responds with HTTP status code 200 OK', async () => {
        await ProductController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('responds with an array that has one product', async () => {
        await ProductController.getAll(request, response);
        expect(response.json.calledWith(singleProduct)).to.be.true;
      });
    });

    context('when the database has multiple products', () => {
      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getAll').resolves(multipleProducts);
      });

      after(() => {
        ProductService.getAll.restore();
      });

      it('responds with HTTP status code 200 OK', async () => {
        await ProductController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('responds with an array that has multiple products', async () => {
        await ProductController.getAll(request, response);
        expect(response.json.calledWith(multipleProducts)).to.be.true;
      });
    });
  });
});
