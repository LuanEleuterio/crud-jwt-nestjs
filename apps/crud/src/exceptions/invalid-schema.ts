import { CodedError } from '@/crud/src/exceptions';

export class InvalidSchema extends CodedError {
  constructor(details?: any){
    super('INVALID_SCHEMA', 'Invalid schema!', details)
  }
}