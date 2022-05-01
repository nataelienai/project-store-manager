require('dotenv').config();
const { expect } = require('chai');
const sinon = require('sinon');
const ProductModel = require('../../../src/models/product.model');
const ProductService = require('../../../src/services/product.service');
const errorCodes = require('../../../src/services/errorCodes');
const productMock = require('../mocks/product.json');
const productsMock = require('../mocks/products.json');

describe('ProductService', () => {
  describe('#getAll()', () => {
    context('when the database is empty', () => {
      before(() => {
        sinon.stub(ProductModel, 'getAll').resolves([]);
      });

      after(() => {
        ProductModel.getAll.restore();
      });

      it('returns an empty array', async () => {
        const { data: products } = await ProductService.getAll();
        expect(products).to.be.an('array').that.is.empty;
      });
    });

    context('when the database has a single product', () => {
      before(() => {
        sinon.stub(ProductModel, 'getAll').resolves([productMock]);
      });

      after(() => {
        ProductModel.getAll.restore();
      });

      it('returns an array with one product', async () => {
        const { data: product } = await ProductService.getAll();
        expect(product).to.deep.equal([productMock]);
      });
    });

    context('when the database has multiple products', () => {
      before(() => {
        sinon.stub(ProductModel, 'getAll').resolves(productsMock);
      });

      after(() => {
        ProductModel.getAll.restore();
      });

      it('returns an array with multiple products', async () => {
        const { data: products } = await ProductService.getAll();
        expect(products).to.deep.equal(productsMock);
      });
    });
  });

  describe('#getById()', () => {
    context('when the product is not present', () => {
      before(() => {
        sinon.stub(ProductModel, 'getById').resolves(null);
      });

      after(() => {
        ProductModel.getById.restore();
      });

      it(`returns an error object with the code ${errorCodes.NOT_FOUND}`, async () => {
        const { error } = await ProductService.getById(1);
        expect(error).to.have.property('code', errorCodes.NOT_FOUND);
      });

      it('returns an error object with the message "Product not found"', async () => {
        const { error } = await ProductService.getById(1);
        expect(error).to.have.property('message', 'Product not found');
      });
    });

    context('when the product is present', () => {
      before(() => {
        sinon.stub(ProductModel, 'getById').resolves(productMock);
      });

      after(() => {
        ProductModel.getById.restore();
      });

      it('returns the product', async () => {
        const { data: product } = await ProductService.getById(productMock.id);
        expect(product).to.deep.equal(productMock);
      });
    });
  });

  describe('#create()', () => {
    context('when the product name already exists', () => {
      before(() => {
        sinon.stub(ProductModel, 'getByName').resolves(productMock);
      });

      after(() => {
        ProductModel.getByName.restore();
      });

      it(`returns an error object with the code ${errorCodes.CONFLICT}`, async () => {
        const { error } = await ProductService.create({
          name: productMock.name,
          quantity: productMock.quantity,
        });
        expect(error).to.have.property('code', errorCodes.CONFLICT);
      });

      it('returns an error object with the message "Product already exists"', async () => {
        const { error } = await ProductService.create({
          name: productMock.name,
          quantity: productMock.quantity,
        });
        expect(error).to.have.property('message', 'Product already exists');
      });
    });

    context('when the product name does not exist', () => {
      before(() => {
        sinon.stub(ProductModel, 'getByName').resolves(null);
        sinon.stub(ProductModel, 'create').resolves(productMock);
      });

      after(() => {
        ProductModel.getByName.restore();
        ProductModel.create.restore();
      });

      it('returns the created product', async () => {
        const { data: product } = await ProductService.create({
          name: productMock.name,
          quantity: productMock.quantity,
        });
        expect(product).to.deep.equal(productMock);
      });
    });
  });

  describe('#update()', () => {
    context('when the product id does not exist', () => {
      before(() => {
        sinon.stub(ProductModel, 'getById').resolves(null);
      });

      after(() => {
        ProductModel.getById.restore();
      });

      it(`returns an error object with the code ${errorCodes.NOT_FOUND}`, async () => {
        const { error } = await ProductService.update(productMock);
        expect(error).to.have.property('code', errorCodes.NOT_FOUND);
      });

      it('returns an error object with the message "Product not found"', async () => {
        const { error } = await ProductService.update(productMock);
        expect(error).to.have.property('message', 'Product not found');
      });
    });

    context('when the product id exists', () => {
      const currentProduct = { id: productMock.id, name: 'Produto', quantity: 15 };

      before(() => {
        sinon.stub(ProductModel, 'getById').resolves(currentProduct);
        sinon.stub(ProductModel, 'update').resolves(productMock);
      });

      after(() => {
        ProductModel.getById.restore();
        ProductModel.update.restore();
      });

      it('returns the updated product', async () => {
        const { data: product } = await ProductService.update(productMock);
        expect(product).to.deep.equal(productMock);
      });
    });
  });

  describe('#deleteById()', () => {
    context('when the product id does not exist', () => {
      before(() => {
        sinon.stub(ProductModel, 'getById').resolves(null);
      });

      after(() => {
        ProductModel.getById.restore();
      });

      it(`returns an error object with the code ${errorCodes.NOT_FOUND}`, async () => {
        const { error } = await ProductService.deleteById(productMock);
        expect(error).to.have.property('code', errorCodes.NOT_FOUND);
      });

      it('returns an error object with the message "Product not found"', async () => {
        const { error } = await ProductService.deleteById(productMock);
        expect(error).to.have.property('message', 'Product not found');
      });
    });

    context('when the product id exists', () => {
      before(() => {
        sinon.stub(ProductModel, 'getById').resolves(productMock);
        sinon.stub(ProductModel, 'deleteById').resolves();
      });

      after(() => {
        ProductModel.getById.restore();
        ProductModel.deleteById.restore();
      });

      it('returns an empty object', async () => {
        const response = await ProductService.deleteById(productMock.id);
        expect(response).to.be.empty;
      });
    });
  });
});
