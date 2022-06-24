import { CodedError } from "./coded-error";

export class IsNotUuidv4 extends CodedError {
  constructor(){
    super('IS_NOT_UUIDV4', 'The value sended is not an uuidv4')
  }
}