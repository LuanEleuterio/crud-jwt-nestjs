import { CodedError } from "./coded-error";

export class CarNotFound extends CodedError {
  constructor(){
    super('CAR_NOT_FOUND', 'Car not found!')
  }
}