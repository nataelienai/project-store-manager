const { expect } = require('chai');
const sinon = require('sinon');
const productValidationMiddleware = require('../../../middlewares/productValidation');
const errorMocks = require('../mocks/errors');

describe('productValidation middleware', () => {
  context('when name is not provided', () => {
    const request = {};
    const response = {};
    const next = sinon.stub().returns();

    before(() => {
      request.body = { quantity: 1 };
    });

    it('calls next() with the error object', () => {
      productValidationMiddleware(request, response, next);
      expect(next.calledWith(errorMocks.requiredProductNameError)).to.be.true;
    });
  });

  context('when name length is less than 5 characters long', () => {
    const request = {};
    const response = {};
    const next = sinon.stub().returns();

    before(() => {
      request.body = { name: 'pro', quantity: 1 };
    });

    it('calls next() with the error object', () => {
      productValidationMiddleware(request, response, next);
      expect(next.calledWith(errorMocks.productNameLengthError)).to.be.true;
    });
  });

  context('when quantity is not provided', () => {
    const request = {};
    const response = {};
    const next = sinon.stub().returns();

    before(() => {
      request.body = { name: 'product' };
    });

    it('calls next() with the error object', () => {
      productValidationMiddleware(request, response, next);
      expect(next.calledWith(errorMocks.requiredQuantityError)).to.be.true;
    });
  });

  context('when quantity is less than 1', () => {
    const request = {};
    const response = {};
    const next = sinon.stub().returns();

    before(() => {
      request.body = { name: 'product', quantity: 0 };
    });

    it('calls next() with the error object', () => {
      productValidationMiddleware(request, response, next);
      expect(next.calledWith(errorMocks.quantityNumberError)).to.be.true;
    });
  });

  context('when name and quantity are valid', () => {
    const request = {};
    const response = {};
    const next = sinon.stub().returns();

    before(() => {
      request.body = { name: 'product', quantity: 1 };
    });

    it('calls next()', () => {
      productValidationMiddleware(request, response, next);
      expect(next.called).to.be.true;
    });
  });
});
