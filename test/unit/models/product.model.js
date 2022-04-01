require("dotenv").config();
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductModel = require('../../../models/product.model');
const productMock = require('../mocks/product.json');
const productsMock = require('../mocks/products.json');

describe('ProductModel', () => {
  describe('#getAll()', () => {
    context('when the database is empty', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns an empty array', async () => {
        const products = await ProductModel.getAll();
        expect(products).to.be.an('array').that.is.empty;
      });
    });

    context('when the database has a single product', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[productMock]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns an array with one product', async () => {
        const products = await ProductModel.getAll();
        expect(products).to.deep.equal([productMock]);
      });
    });

    context('when the database has multiple products', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([productsMock]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns an array with multiple products', async () => {
        const products = await ProductModel.getAll();
        expect(products).to.deep.equal(productsMock);
      });
    });
  });

  describe('#getById()', () => {
    context('when the product is not present', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns null', async () => {
        const product = await ProductModel.getById(1);
        expect(product).to.be.null;
      });
    });

    context('when the product is present', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[productMock]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns the product', async () => {
        const product = await ProductModel.getById(productMock.id);
        expect(product).to.deep.equal(productMock);
      });
    });
  });
});
