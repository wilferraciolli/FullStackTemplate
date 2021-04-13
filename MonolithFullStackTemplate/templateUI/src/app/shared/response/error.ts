
// TODO class to be used to map api error messages
export class ErrorResponse {
  error: number;
  errors: Array<Error>;
  message: string;
  path: string;
  status: number;
  timestamp: string;
}

class Error {
  defaultMessage: string;
  objectName: string;
  code: string;
}
