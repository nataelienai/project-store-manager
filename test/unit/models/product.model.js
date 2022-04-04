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
    context('when the id does not exist', () => {
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

    context('when the id exists', () => {
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

  describe('#getByName()', () => {
    context('when the name does not exist', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns null', async () => {
        const product = await ProductModel.getByName('Produto');
        expect(product).to.be.null;
      });
    });

    context('when the name exists', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[productMock]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns the product', async () => {
        const product = await ProductModel.getByName(productMock.name);
        expect(product).to.deep.equal(productMock);
      });
    });
  });

  describe('#create()', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: productMock.id }]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('returns the created product', async () => {
      const product = await ProductModel.create({
        name: productMock.name,
        quantity: productMock.quantity,
      });
      expect(product).to.deep.equal(productMock);
    });
  });

  describe('#update()', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('returns the updated product', async () => {
      const product = await ProductModel.update(productMock);
      expect(product).to.deep.equal(productMock);
    });
  });

  describe('#deleteById()', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('calls connection.execute()', async () => {
      await ProductModel.deleteById(productMock.id);
      expect(connection.execute.called).to.be.true;
    });
  });

  describe('#hasEnoughStock()', () => {
    context('when the quantity of the product is not sufficient', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves(
          [[{ quantity: productMock.quantity - 1 }]]
        );
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns false', async () => {
        const hasEnoughStock = await ProductModel.hasEnoughStock(productMock);
        expect(hasEnoughStock).to.be.false;
      });
    });

    context('when the quantity of the product is sufficient', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves(
          [[{ quantity: productMock.quantity }]]
        );
      });

      after(() => {
        connection.execute.restore();
      });

      it('returns true', async () => {
        const hasEnoughStock = await ProductModel.hasEnoughStock(productMock);
        expect(hasEnoughStock).to.be.true;
      });
    });
  });
});
