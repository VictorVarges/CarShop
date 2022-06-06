export enum MESSHTTP {
  INTERNAL = 'Internal Server Error',
  NOT_FOUND = 'Object not found',
  REQUIRED_ID = 'Id is required',
  ZOD_ERROR = 'Bad request',
  CARAC_ERR = 'Id must have 24 hexadecimal characters',
}

export enum CODEHTTP {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_CODE = 500,
}
