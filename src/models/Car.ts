import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends Car, Document { }

const frameSchema = new Schema<CarDocument>({
  model: string,
  year: number,
  color: string,
  buyValue: number,
  doorsQty: number,
  seatsQty: number,
});

export default class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', frameSchema)) {
    super(model);
  }
}