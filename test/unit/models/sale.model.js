require("dotenv").config();
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const SaleModel = require('../../../models/sale.model');
const salesCamelCaseMock = require('../mocks/salesCamelCase.json');
const salesSnakeCaseMock = require('../mocks/salesSnakeCase.json');

describe('SaleModel', () => {
  describe('#getAll()', () => {
    context('when the database is empty', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns an empty array', async () => {
        const sales = await SaleModel.getAll();
        expect(sales).to.be.an('array').that.is.empty;
      });
    });

    context('when the database has a single sale', () => {
      before(() => {
        const saleSnakeCase = salesSnakeCaseMock[0];
        sinon.stub(connection, 'execute').resolves([[saleSnakeCase]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns an array with one single', async () => {
        const sales = await SaleModel.getAll();
        const saleCamelCase = salesCamelCaseMock[0];

        expect(sales).to.deep.equal([saleCamelCase]);
      });
    });

    context('when the database has multiple sales', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([salesSnakeCaseMock]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns an array with multiple sales', async () => {
        const sales = await SaleModel.getAll();
        expect(sales).to.deep.equal(salesCamelCaseMock);
      });
    });
  });
});
