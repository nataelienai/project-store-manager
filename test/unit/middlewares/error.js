const { expect } = require('chai');
const sinon = require('sinon');
const errorMiddleware = require('../../../middlewares/error');
const errorMocks = require('../mocks/errors');

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
      errorMiddleware(errorMocks.productNotFoundError, request, response, next);
      expect(response.status.calledWith(404)).to.be.true;
    });

    it('responds with an object containing the error message', () => {
      errorMiddleware(errorMocks.productNotFoundError, request, response, next);

      const errorMessage = { message: errorMocks.productNotFoundError.message };
      expect(response.json.calledWith(errorMessage)).to.be.true;
    });
  });

  context('when it receives a Bad Request error code', () => {
    const request = {};
    const response = {};
    const next = () => {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it('responds with HTTP status code 400 Bad Request', () => {
      errorMiddleware(errorMocks.requiredProductNameError, request, response, next);
      expect(response.status.calledWith(400)).to.be.true;
    });

    it('responds with an object containing the error message', () => {
      errorMiddleware(errorMocks.requiredProductNameError, request, response, next);

      const errorMessage = { message: errorMocks.requiredProductNameError.message };
      expect(response.json.calledWith(errorMessage)).to.be.true;
    });
  });

  context('when it receives a Unprocessable Entity error code', () => {
    const request = {};
    const response = {};
    const next = () => {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it('responds with HTTP status code 422 Unprocessable Entity', () => {
      errorMiddleware(errorMocks.productNameLengthError, request, response, next);
      expect(response.status.calledWith(422)).to.be.true;
    });

    it('responds with an object containing the error message', () => {
      errorMiddleware(errorMocks.productNameLengthError, request, response, next);

      const errorMessage = { message: errorMocks.productNameLengthError.message };
      expect(response.json.calledWith(errorMessage)).to.be.true;
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
