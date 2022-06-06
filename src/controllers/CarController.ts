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
      const car = await this.service.create(body);
      if (!car) {
        return res.status(this.code.INTERNAL_CODE)
          .json({ error: this.mess.INTERNAL });
      }
      if ('error' in car) {
        return res.status(this.code.BAD_REQUEST).json(car);
      }
      return res.status(this.code.CREATED).json(car);
    } catch (err) {
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
      const frame = await this.service.readOne(id);
      return frame
        ? res.status(this.code.OK).json(frame)
        : res.status(this.code.NOT_FOUND).json({ error: this.mess.NOT_FOUND });
    } catch (error) {
      return res.status(this.code.INTERNAL_CODE)
        .json({ error: this.mess.INTERNAL });
    }
  };
}

export default CarControlller;
