require("dotenv").config();
const { expect } = require('chai');
const sinon = require('sinon');
const SaleModel = require('../../../models/sale.model');
const SaleService = require('../../../services/sale.service');
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
});
