require('dotenv').config();
const { expect } = require('chai');
const sinon = require('sinon');
const SaleService = require('../../../services/sale.service');
const SaleController = require('../../../controllers/sale.controller');
const salesMock = require('../mocks/salesCamelCase.json');

describe('SaleController', () => {
  describe('#getAll()', () => {
    context('when the database is empty', () => {
      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SaleService, 'getAll').resolves({ data: [] });
      });

      after(() => {
        SaleService.getAll.restore();
      });

      it('responds with HTTP status code 200 OK', async () => {
        await SaleController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('responds with an empty array', async () => {
        await SaleController.getAll(request, response);
        expect(response.json.calledWith([])).to.be.true;
      });
    });

    context('when the database has a single product', () => {
      const request = {};
      const response = {};
      const sale = salesMock[0];

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SaleService, 'getAll').resolves({ data: [sale] });
      });

      after(() => {
        SaleService.getAll.restore();
      });

      it('responds with HTTP status code 200 OK', async () => {
        await SaleController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('responds with an array that has one product', async () => {
        await SaleController.getAll(request, response);
        expect(response.json.calledWith([sale])).to.be.true;
      });
    });

    context('when the database has multiple products', () => {
      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SaleService, 'getAll').resolves({ data: salesMock });
      });

      after(() => {
        SaleService.getAll.restore();
      });

      it('responds with HTTP status code 200 OK', async () => {
        await SaleController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('responds with an array that has multiple products', async () => {
        await SaleController.getAll(request, response);
        expect(response.json.calledWith(salesMock)).to.be.true;
      });
    });
  });
});
