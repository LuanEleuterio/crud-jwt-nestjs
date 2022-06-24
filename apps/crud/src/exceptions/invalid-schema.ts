import { CodedError } from "./coded-error";

export class InvalidSchema extends CodedError {
  constructor(details?: any){
    super('INVALID_SCHEMA', 'Invalid schema!', details)
  }
}