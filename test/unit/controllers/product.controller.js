require('dotenv').config();
const { expect } = require('chai');
const sinon = require('sinon');
const ProductService = require('../../../services/product.service');
const ProductController = require('../../../controllers/product.controller');
const singleProduct = require('../mocks/singleProduct.json');
const multipleProducts = require('../mocks/multipleProducts.json');
const productNotFoundError = require('../mocks/productNotFoundError.json');

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

  describe('#getById()', () => {
    context('when the product is not present', () => {
      const request = {};
      const response = {};
      const next = sinon.stub().returns();

      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves({ error: productNotFoundError });
      });

      after(() => {
        ProductService.getById.restore();
      });

      it('calls next() with the error object', async () => {
        await ProductController.getById(request, response, next);
        expect(next.calledWith(productNotFoundError)).to.be.true;
      });
    });

    context('when the product is present', () => {
      const expectedProduct = multipleProducts.find(({ id }) => id === 2);
      const request = {};
      const response = {};

      before(() => {
        request.params = { id: 2 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves(expectedProduct);
      });

      after(() => {
        ProductService.getById.restore();
      });

      it('responds with HTTP status code 200 OK', async () => {
        await ProductController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('responds with the product object', async () => {
        await ProductController.getById(request, response);
        expect(response.json.calledWith(expectedProduct)).to.be.true;
      });
    });
  });
});
