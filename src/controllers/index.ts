import { Request, Response } from 'express';
import Service from '../services/index';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

abstract class Controller<T> {
  abstract route: string;

  constructor(protected service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}
export default Controller;
