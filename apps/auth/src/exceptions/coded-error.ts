export abstract class CodedError extends Error {

  message: string;

  code: string;

  statusCode: number;

  details?: any;

  constructor(code: string, message: string, statusCode: number, details?: any){
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details
    }
  }

}