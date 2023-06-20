import { StatusCodes } from 'http-status-codes';

export enum ErrorTypes {
  GenericError = 'GenericError',
  BadRequest = 'BadRequest',
  DoctorNotFound = 'DoctorNotFound',
  PatientNotFound = 'PatientNotFound',
  ReportNotFound = 'ReportNotFound',
  ConflictError = 'ConflictError',
  UnauthorizedError = 'UnauthorizedError',
  InvalidToken = 'InvalidToken'
}

interface ErrorResponseObject {
  message: string
  httpStatus: number
}

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
}

export const errorCatalog: ErrorCatalog = {
  GenericError: {
    message: 'Internal error',
    httpStatus: StatusCodes.INTERNAL_SERVER_ERROR
  },
  BadRequest: {
    message: 'Something wrong happened',
    httpStatus: StatusCodes.BAD_REQUEST
  },
  DoctorNotFound: {
    message: 'Doctor Not Found',
    httpStatus: StatusCodes.NOT_FOUND
  },
  PatientNotFound: {
    message: 'Patient Not Found',
    httpStatus: StatusCodes.NOT_FOUND
  },
  ReportNotFound: {
    message: 'Report Not Found',
    httpStatus: StatusCodes.NOT_FOUND
  },
  ConflictError: {
    message: 'Email already in use',
    httpStatus: StatusCodes.CONFLICT
  },
  UnauthorizedError: {
    message: 'Invalid username or password',
    httpStatus: StatusCodes.UNAUTHORIZED
  },
  InvalidToken: {
    message: 'Invalid Token',
    httpStatus: StatusCodes.UNAUTHORIZED
  }
}
