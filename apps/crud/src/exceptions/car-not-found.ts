import { CodedError } from '@/crud/src/exceptions';

export class CarNotFound extends CodedError {
  constructor(){
    super('CAR_NOT_FOUND', 'Car not found!')
  }
}