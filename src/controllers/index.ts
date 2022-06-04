import { Request, Response } from 'express';
import { MESSHTTP, CODEHTTP } from '../http/Responses';
import Service from '../services/index';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

abstract class Controller<T> {
  abstract route: string;

  protected errMess = MESSHTTP;

  protected errCode = CODEHTTP;

  constructor(protected service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(this.errCode.INTERNAL_CODE)
        .json({ error: this.errMess.INTERNAL });
    }
  };

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract update(
    req: Request<{ id: string }>,
    res: Response<T | null>
  ): Promise<Response<T | null> | void>;

  abstract delete(
    req: Request<{ id: string }>,
    res: Response<T | null>
  ): Promise<Response<T | null> | void>;
}
export default Controller;
