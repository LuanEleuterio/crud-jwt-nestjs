export abstract class CodedError extends Error {

  message: string;

  code: string;

  details?: any;

  constructor(code: string, message: string, details?: any){
    super(message);
    this.code = code;
    this.details = details;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      details: this.details
    }
  }

}