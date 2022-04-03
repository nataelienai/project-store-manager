require('dotenv').config();
const { expect } = require('chai');
const sinon = require('sinon');
const SaleService = require('../../../services/sale.service');
const SaleController = require('../../../controllers/sale.controller');
const saleMock = require('../mocks/saleCamelCase.json');
const salesMock = require('../mocks/salesCamelCase.json');
const errorMocks = require('../mocks/errors.js');

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

    context('when the database has a single sale', () => {
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

      it('responds with an array that has one sale', async () => {
        await SaleController.getAll(request, response);
        expect(response.json.calledWith([sale])).to.be.true;
      });
    });

    context('when the database has multiple sales', () => {
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

      it('responds with an array that has multiple sales', async () => {
        await SaleController.getAll(request, response);
        expect(response.json.calledWith(salesMock)).to.be.true;
      });
    });
  });

  describe('#getById()', () => {
    context('when the sale is not present', () => {
      const request = {};
      const response = {};
      const next = sinon.stub().returns();

      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SaleService, 'getById').resolves({ error: errorMocks.saleNotFoundError });
      });

      after(() => {
        SaleService.getById.restore();
      });

      it('calls next() with the error object', async () => {
        await SaleController.getById(request, response, next);
        expect(next.calledWith(errorMocks.saleNotFoundError)).to.be.true;
      });
    });

    context('when the sale is present', () => {
      const request = {};
      const response = {};

      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SaleService, 'getById').resolves({ data: saleMock });
      });

      after(() => {
        SaleService.getById.restore();
      });

      it('responds with HTTP status code 200 OK', async () => {
        await SaleController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('responds with the sale object', async () => {
        await SaleController.getById(request, response);
        expect(response.json.calledWith(saleMock)).to.be.true;
      });
    });
  });

  describe('#create()', () => {
    const request = {};
    const response = {};
    const createdSaleMock = {
      id: 1,
      itemsSold: saleMock.map(({ productId, quantity }) => ({ productId, quantity })),
    };

    before(() => {
      request.body = createdSaleMock.itemsSold;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, 'create').resolves({ data: createdSaleMock });
    });

    after(() => {
      SaleService.create.restore();
    });

    it('responds with HTTP status code 201 Created', async () => {
      await SaleController.create(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    });

    it('responds with the created sale', async () => {
      await SaleController.create(request, response);
      expect(response.json.calledWith(createdSaleMock)).to.be.true;
    });
  });

  describe('#update()', () => {
    const request = {};
    const response = {};
    const updatedSaleMock = {
      saleId: 1,
      itemUpdated: saleMock.map(({ productId, quantity }) => ({ productId, quantity })),
    };

    before(() => {
      request.params = { id: updatedSaleMock.saleId };
      request.body = updatedSaleMock.itemUpdated;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, 'update').resolves({ data: updatedSaleMock });
    });

    after(() => {
      SaleService.update.restore();
    });

    it('responds with HTTP status code 200 OK', async () => {
      await SaleController.update(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it('responds with the updated sale', async () => {
      await SaleController.update(request, response);
      expect(response.json.calledWith(updatedSaleMock)).to.be.true;
    });
  });
});
