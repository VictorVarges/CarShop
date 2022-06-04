import Service, { ServiceError } from '.';
import CarModel from '../models/CarModel';
import { Car, CarSchema } from '../interfaces/CarInterface';

export default class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(obj);
    
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}
