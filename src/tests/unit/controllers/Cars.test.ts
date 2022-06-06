import Sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import server from '../../../server';
import CarService from '../../../services/CarServices';

chai.use(chaiHttp);

const { expect } = chai;

const mockCar = {
  model: 'Tesla Model S',
  year: 2008,
  color: 'grey',
  buyValue: 7900,
  seatsQty: 4,
  doorsQty: 2
};

const mockCarById = {
  _id: '62915f43ba838203ca1bd742',
  model: 'Tesla Model S',
  year: 2008,
  color: 'grey',
  buyValue: 7900,
  seatsQty: 4,
  doorsQty: 2
};

describe('CarController', () => {
  describe('Create car', async () => {
    const carService = new CarService();
    before(async () => {
      Sinon
      .stub(carService, 'create')
      .resolves(mockCarById);
    });

    after(()=>{
      (carService.create as sinon.SinonStub).restore();
    })

    it('validates if it is possible to create a new car and its respective status', () => {
      chai.request(server.app)
        .get('/cars').send()
        .end((_err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.text).to.be.equal(JSON.stringify(mockCarById));
      });
    });
  });

  describe('Get cars', async () => {
    const carService = new CarService();
    before(async () => {
      Sinon
      .stub(carService, 'read')
      .resolves([mockCarById]);
    });

    after(()=>{
      (carService.read as sinon.SinonStub).restore();
    })

    it('validates if when activating the get method, the array with all cars is returned', () => {
      chai.request(server.app)
        .get('/cars').send()
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.text).to.be.equal(JSON.stringify([mockCarById]));
      });
    });
  });

  describe('Read car by id', async () => {
    const carService = new CarService();
    before(async () => {
      Sinon
      .stub(carService, 'readOne')
      .resolves(mockCarById);
    });

    after(()=>{
      (carService.readOne as sinon.SinonStub).restore();
    })

    it('validates if you can list a car by id', () => {
      chai.request(server.app)
        .get(`/cars/${mockCarById._id}`).send()
        .end((_err, res) => {
          expect(res).to.have.status(200);
      });
    });

    it('validates the status, if you cant list a car by id', () => {
      chai.request(server.app)
        .get(`/cars/${mockCarById._id}`).send()
        .end((_err, res) => {
          expect(res).to.have.status(400);
      });
    });
  });

  describe('Update car', async () => {
    const carService = new CarService();
    before(async () => {
      Sinon
      .stub(carService, 'up')
      .resolves(mockCarById);
    });

    after(()=>{
      (carService.up as sinon.SinonStub).restore();
    })

    it('validates if you can update a car by id', () => {
      chai.request(server.app)
        .put(`/cars/${mockCarById._id}`).send(mockCar)
        .end((_err, res) => {
          expect(res).to.have.status(200);
      });
    });

    it('validates if there is no body in the request and the status returned', () => {
      chai.request(server.app)
        .put(`/cars/${mockCarById._id}`).send()
        .end((_err, res) => {
          expect(res).to.have.status(400);
      });
    });

    it('validates if informing a wrong id returns an error status', () => {
      chai.request(server.app)
        .put('/cars/nxksnkidnciknsd').send()
        .end((_err, res) => {
          expect(res).to.have.status(400);
      });
    });
  });

  describe('Delete car', async () => {
    const carService = new CarService();
    before(async () => {
      Sinon
      .stub(carService, 'delete')
      .resolves();
    });

    after(()=>{
      (carService.delete as sinon.SinonStub).restore();
    })

    it('validates if it is possible to delete a car', () => {
      chai.request(server.app)
        .delete(`/cars/${mockCarById._id}`).send()
        .end((_err, res) => {
          expect(res).to.have.status(204);
      });
    });

    it('validates if the id is invalid', () => {
      chai.request(server.app)
        .delete(`/cars/${mockCarById._id}`).send()
        .end((_err, res) => {
          expect(res).to.have.status(400);
      });
    });
  });
});