require('dotenv').config();
const { expect } = require('chai');
const sinon = require('sinon');
const ProductService = require('../../../services/product.service');
const ProductController = require('../../../controllers/product.controller');
const productMock = require('../mocks/product.json');
const productsMock = require('../mocks/products.json');
const productNotFoundErrorMock = require('../mocks/productNotFoundError.js');

describe('ProductController', () => {
  describe('#getAll()', () => {
    context('when the database is empty', () => {
      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getAll').resolves({ data: [] });
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

        sinon.stub(ProductService, 'getAll').resolves({ data: [productMock] });
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
        expect(response.json.calledWith([productMock])).to.be.true;
      });
    });

    context('when the database has multiple products', () => {
      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getAll').resolves({ data: productsMock });
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
        expect(response.json.calledWith(productsMock)).to.be.true;
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

        sinon.stub(ProductService, 'getById').resolves({ error: productNotFoundErrorMock });
      });

      after(() => {
        ProductService.getById.restore();
      });

      it('calls next() with the error object', async () => {
        await ProductController.getById(request, response, next);
        expect(next.calledWith(productNotFoundErrorMock)).to.be.true;
      });
    });

    context('when the product is present', () => {
      const expectedProduct = productsMock.find(({ id }) => id === 2);
      const request = {};
      const response = {};

      before(() => {
        request.params = { id: 2 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves({ data: expectedProduct });
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
