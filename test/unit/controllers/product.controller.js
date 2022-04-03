require('dotenv').config();
const { expect } = require('chai');
const sinon = require('sinon');
const ProductService = require('../../../services/product.service');
const ProductController = require('../../../controllers/product.controller');
const productMock = require('../mocks/product.json');
const productsMock = require('../mocks/products.json');
const errorsMock = require('../mocks/errors.js');

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

        sinon.stub(ProductService, 'getById').resolves({ error: errorsMock.productNotFoundError });
      });

      after(() => {
        ProductService.getById.restore();
      });

      it('calls next() with the error object', async () => {
        await ProductController.getById(request, response, next);
        expect(next.calledWith(errorsMock.productNotFoundError)).to.be.true;
      });
    });

    context('when the product is present', () => {
      const request = {};
      const response = {};

      before(() => {
        request.params = { id: productMock.id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves({ data: productMock });
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
        expect(response.json.calledWith(productMock)).to.be.true;
      });
    });
  });

  describe('#create()', () => {
    context('when the product already exists', () => {
      const request = {};
      const response = {};
      const next = sinon.stub().returns();

      before(() => {
        request.body = { name: productMock.name, quantity: productMock.quantity };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'create').resolves({
          error: errorsMock.productAlreadyExistsError
        });
      });

      after(() => {
        ProductService.create.restore();
      });

      it('calls next() with the error object', async () => {
        await ProductController.create(request, response, next);
        expect(next.calledWith(errorsMock.productAlreadyExistsError)).to.be.true;
      });
    });

    context('when the product does not exist', () => {
      const request = {};
      const response = {};

      before(() => {
        request.body = { name: productMock.name, quantity: productMock.quantity };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'create').resolves({ data: productMock });
      });

      after(() => {
        ProductService.create.restore();
      });

      it('responds with HTTP status code 201 Created', async () => {
        await ProductController.create(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      });

      it('responds with the product object', async () => {
        await ProductController.create(request, response);
        expect(response.json.calledWith(productMock)).to.be.true;
      });
    });
  });

  describe('#update()', () => {
    context('when the product id does not exist', () => {
      const request = {};
      const response = {};
      const next = sinon.stub().returns();

      before(() => {
        request.params = { id: productMock.id };
        request.body = { name: productMock.name, quantity: productMock.quantity };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'update').resolves({
          error: errorsMock.productNotFoundError
        });
      });

      after(() => {
        ProductService.update.restore();
      });

      it('calls next() with the error object', async () => {
        await ProductController.update(request, response, next);
        expect(next.calledWith(errorsMock.productNotFoundError)).to.be.true;
      });
    });

    context('when the product exists', () => {
      const request = {};
      const response = {};

      before(() => {
        request.params = { id: productMock.id };
        request.body = { name: productMock.name, quantity: productMock.quantity };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'update').resolves({ data: productMock });
      });

      after(() => {
        ProductService.update.restore();
      });

      it('responds with HTTP status code 200 OK', async () => {
        await ProductController.update(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('responds with the product object', async () => {
        await ProductController.update(request, response);
        expect(response.json.calledWith(productMock)).to.be.true;
      });
    });
  });
});
