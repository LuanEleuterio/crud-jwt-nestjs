import { CodedError } from '../exceptions';

export class InvalidSchema extends CodedError {
  constructor(details?: any){
    super('INVALID_SCHEMA', 'Invalid schema!', 400, details)
  }
}