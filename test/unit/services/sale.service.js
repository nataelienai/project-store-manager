require("dotenv").config();
const { expect } = require('chai');
const sinon = require('sinon');
const SaleModel = require('../../../models/sale.model');
const SaleService = require('../../../services/sale.service');
const errorCodes = require('../../../services/errorCodes');
const saleMock = require('../mocks/saleCamelCase.json');
const salesMock = require('../mocks/salesCamelCase.json');

describe('SaleService', () => {
  describe('#getAll()', () => {
    context('when the database is empty', () => {
      before(() => {
        sinon.stub(SaleModel, 'getAll').resolves([]);
      });

      after(() => {
        SaleModel.getAll.restore();
      });

      it('returns an empty array', async () => {
        const { data: sales } = await SaleService.getAll();
        expect(sales).to.be.an('array').that.is.empty;
      });
    });

    context('when the database has a single sale', () => {
      const sale = salesMock[0];

      before(() => {
        sinon.stub(SaleModel, 'getAll').resolves([sale]);
      });

      after(() => {
        SaleModel.getAll.restore();
      });

      it('returns an array with one single', async () => {
        const { data: sales } = await SaleService.getAll();
        expect(sales).to.deep.equal([sale]);
      });
    });

    context('when the database has multiple sales', () => {
      before(() => {
        sinon.stub(SaleModel, 'getAll').resolves(salesMock);
      });

      after(() => {
        SaleModel.getAll.restore();
      });

      it('returns an array with multiple sales', async () => {
        const { data: sales } = await SaleService.getAll();
        expect(sales).to.deep.equal(salesMock);
      });
    });
  });

  describe('#getById()', () => {
    context('when the sale is not present', () => {
      before(() => {
        sinon.stub(SaleModel, 'getById').resolves(null);
      });

      after(() => {
        SaleModel.getById.restore();
      });

      it(`returns an error object with the code ${errorCodes.NOT_FOUND}`, async () => {
        const { error } = await SaleService.getById(1);
        expect(error).to.have.property('code', errorCodes.NOT_FOUND);
      });

      it('returns an error object with the message "Sale not found"', async () => {
        const { error } = await SaleService.getById(1);
        expect(error).to.have.property('message', 'Sale not found');
      });
    });

    context('when the sale is present', () => {
      before(() => {
        sinon.stub(SaleModel, 'getById').resolves(saleMock);
      });

      after(() => {
        SaleModel.getById.restore();
      });

      it('returns the sale', async () => {
        const { data: sale } = await SaleService.getById(1);
        expect(sale).to.deep.equal(saleMock);
      });
    });
  });
});
