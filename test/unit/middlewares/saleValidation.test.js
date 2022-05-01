const { expect } = require('chai');
const sinon = require('sinon');
const saleValidationMiddleware = require('../../../src/middlewares/saleValidation');
const errorMocks = require('../mocks/errors');

describe('saleValidationMiddleware', () => {
  context('when productId is not provided', () => {
    const request = {};
    const response = {};
    const next = sinon.stub().returns();

    before(() => {
      request.body = [{ quantity: 1 }];
    });

    it('calls next() with the error object', () => {
      saleValidationMiddleware(request, response, next);
      expect(next.calledWith(errorMocks.requiredProductIdError)).to.be.true;
    });
  });

  context('when quantity is not provided', () => {
    const request = {};
    const response = {};
    const next = sinon.stub().returns();

    before(() => {
      request.body = [{ productId: 1 }];
    });

    it('calls next() with the error object', () => {
      saleValidationMiddleware(request, response, next);
      expect(next.calledWith(errorMocks.requiredQuantityError)).to.be.true;
    });
  });

  context('when quantity is less than 1', () => {
    const request = {};
    const response = {};
    const next = sinon.stub().returns();

    before(() => {
      request.body = [{ productId: 1, quantity: 0 }];
    });

    it('calls next() with the error object', () => {
      saleValidationMiddleware(request, response, next);
      expect(next.calledWith(errorMocks.quantityNumberError)).to.be.true;
    });
  });

  context('when productId and quantity are valid', () => {
    const request = {};
    const response = {};
    const next = sinon.stub().returns();

    before(() => {
      request.body = [{ productId: 1, quantity: 1 }];
    });

    it('calls next()', () => {
      saleValidationMiddleware(request, response, next);
      expect(next.called).to.be.true;
    });
  });
});
