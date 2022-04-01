const { expect } = require('chai');
const sinon = require('sinon');
const errorMiddleware = require('../../../middlewares/error');
const productNotFoundError = require('../mocks/productNotFoundError.json');

describe('ErrorMiddleware', () => {
  context('when it receives a Not Found error code', () => {
    const request = {};
    const response = {};
    const next = () => {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it('responds with HTTP status code 404 Not Found', () => {
      errorMiddleware(productNotFoundError, request, response, next);
      expect(response.status.calledWith(404)).to.be.true;
    });

    it('responds with an object containing the error message', () => {
      errorMiddleware(productNotFoundError, request, response, next);
      expect(response.json.calledWith({ message: productNotFoundError.message })).to.be.true;
    });
  });

  context('when an unknown error occurs', () => {
    const request = {};
    const response = {};
    const next = () => {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it('responds with HTTP status code 500 Internal Server Error', () => {
      errorMiddleware({}, request, response, next);
      expect(response.status.calledWith(500)).to.be.true;
    });

    it('responds with an object containing the message "Internal Server Error"', () => {
      errorMiddleware({}, request, response, next);
      expect(response.json.calledWith({ message: "Internal Server Error" })).to.be.true;
    });
  });
});
