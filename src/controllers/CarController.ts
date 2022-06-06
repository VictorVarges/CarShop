import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import { MESSHTTP, CODEHTTP } from '../http/Responses';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/CarServices';

class CarControlller extends Controller<Car> {
  private $route: string;

  protected mess = MESSHTTP;

  protected code = CODEHTTP;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const createNewCar = await this.service.create(body);
      if (!createNewCar) {
        return res.status(this.code.INTERNAL_CODE)
          .json({ error: this.mess.INTERNAL });
      }
      if ('error' in createNewCar) {
        return res.status(this.code.BAD_REQUEST).json(createNewCar);
      }
      return res.status(this.code.CREATED).json(createNewCar);
    } catch (err) {
      return res.status(this.code.INTERNAL_CODE)
        .json({ error: this.mess.INTERNAL });
    }
  };

  read = async (
    req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const getAllCars = await this.service.read();
      return res.status(this.code.OK).json(getAllCars);
    } catch (error) {
      return res.status(this.code.INTERNAL_CODE)
        .json({ error: this.mess.INTERNAL });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res
          .status(this.code.BAD_REQUEST).json({ error: this.mess.CARAC_ERR });
      }
      const carById = await this.service.readOne(id);

      return carById
        ? res.status(this.code.OK).json(carById)
        : res.status(this.code.NOT_FOUND).json({ error: this.mess.NOT_FOUND });
    } catch (error) {
      return res
        .status(this.code.INTERNAL_CODE).json({ error: this.mess.INTERNAL });
    }
  };

  up = async (req: Request<{ id: string }>, res: Response<Car | ResponseError>):
  Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;

    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.mess.CARAC_ERR });
      }
      const carById = await this.service.up(id, body);

      if (!carById) { 
        return res.status(404).json({ error: this.mess.NOT_FOUND });
      }

      return 'error' in carById
        ? res.status(this.code.NOT_FOUND).json({ error: this.mess.NOT_FOUND })
        : res.status(this.code.OK).json(carById);
    } catch (error) {
      return res.status(500).json({ error: this.mess.INTERNAL });
    }
  };
}

export default CarControlller;
