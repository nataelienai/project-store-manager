require("dotenv").config();
const { expect } = require('chai');
const sinon = require('sinon');
const SaleModel = require('../../../src/models/sale.model');
const ProductModel = require('../../../src/models/product.model');
const SaleService = require('../../../src/services/sale.service');
const errorCodes = require('../../../src/services/errorCodes');
const saleMock = require('../mocks/saleCamelCase.json');
const salesMock = require('../mocks/salesCamelCase.json');
const productMock = require('../mocks/product.json');

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

  describe('#create()', () => {
    const createdSaleMock = {
      id: 1,
      itemsSold: saleMock.map(({ productId, quantity }) => ({ productId, quantity })),
    };

    context('when there is not enough product stock', () => {
      before(() => {
        sinon.stub(ProductModel, 'hasEnoughStock').resolves(false);
      });

      after(() => {
        ProductModel.hasEnoughStock.restore();
      });

      it(`returns an error object with the code ${errorCodes.UNPROCESSABLE_ENTITY}`, async () => {
        const { error } = await SaleService.create(createdSaleMock.itemsSold);
        expect(error).to.have.property('code', errorCodes.UNPROCESSABLE_ENTITY);
      });

      it('returns an error object with the message "Such amount is not permitted to sell"', async () => {
        const { error } = await SaleService.create(createdSaleMock.itemsSold);
        expect(error).to.have.property('message', 'Such amount is not permitted to sell');
      });
    });

    context('when there is enough product stock', () => {
      before(() => {
        sinon.stub(ProductModel, 'hasEnoughStock').resolves(true);
        sinon.stub(ProductModel, 'getById').resolves(productMock);
        sinon.stub(ProductModel, 'update').resolves();
        sinon.stub(SaleModel, 'create').resolves(createdSaleMock);
      });

      after(() => {
        ProductModel.hasEnoughStock.restore();
        ProductModel.getById.restore();
        ProductModel.update.restore();
        SaleModel.create.restore();
      });

      it('returns the created sale', async () => {
        const { data: sale } = await SaleService.create(createdSaleMock.itemsSold);
        expect(sale).to.deep.equal(createdSaleMock);
      });
    });
  });

  describe('#update()', () => {
    const updatedSaleMock = {
      saleId: 1,
      itemUpdated: saleMock.map(({ productId, quantity }) => ({ productId, quantity })),
    };

    before(() => {
      sinon.stub(SaleModel, 'update').resolves(updatedSaleMock);
    });

    after(() => {
      SaleModel.update.restore();
    });

    it('returns the updated sale', async () => {
      const { data: sale } = await SaleService.update(
        updatedSaleMock.saleId,
        updatedSaleMock.itemUpdated
      );
      expect(sale).to.deep.equal(updatedSaleMock);
    });
  });

  describe('#deleteById()', () => {
    context('when the sale id does not exist', () => {
      before(() => {
        sinon.stub(SaleModel, 'getById').resolves(null);
      });

      after(() => {
        SaleModel.getById.restore();
      });

      it(`returns an error object with the code ${errorCodes.NOT_FOUND}`, async () => {
        const { error } = await SaleService.deleteById(1);
        expect(error).to.have.property('code', errorCodes.NOT_FOUND);
      });

      it('returns an error object with the message "Sale not found"', async () => {
        const { error } = await SaleService.deleteById(1);
        expect(error).to.have.property('message', 'Sale not found');
      });
    });

    context('when the sale id exists', () => {
      before(() => {
        sinon.stub(SaleModel, 'getById').resolves(saleMock);
        sinon.stub(ProductModel, 'getById').resolves(productMock);
        sinon.stub(ProductModel, 'update').resolves();
        sinon.stub(SaleModel, 'deleteById').resolves();
      });

      after(() => {
        SaleModel.getById.restore();
        ProductModel.getById.restore();
        ProductModel.update.restore();
        SaleModel.deleteById.restore();
      });

      it('returns an empty object', async () => {
        const response = await SaleService.deleteById(1);
        expect(response).to.be.empty;
      });
    });
  });
});
