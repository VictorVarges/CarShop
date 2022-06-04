import CustomRouter from './router/routs';
import App from './app';
import { Car } from './interfaces/CarInterface';
import CarController from './controllers/CarController';

const server = new App();

const carController = new CarController();

const routerCar = new CustomRouter<Car>();
routerCar.addRoute(carController);

server.addRouter(routerCar.router);

export default server; 