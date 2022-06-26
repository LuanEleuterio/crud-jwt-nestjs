import { CodedError } from  '../exceptions';

export class CarNotFound extends CodedError {
  constructor(){
    super('CAR_NOT_FOUND', 'Car not found!', 404)
  }
}