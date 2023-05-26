import { StatusCodes } from 'http-status-codes';

export enum ErrorTypes {
  GenericError = 'GenericError',
  BadRequest = 'BadRequest',
  EntityNotFound = 'EntityNotFound',
  ConflictError = 'ConflictError',
  ValidationError = 'ValidationError',
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
    message: 'Something wrong happend',
    httpStatus: StatusCodes.BAD_REQUEST
  },
  EntityNotFound: {
    message: 'Entity Not Found',
    httpStatus: StatusCodes.NOT_FOUND
  },
  ConflictError: {
    message: 'Entity already exists',
    httpStatus: StatusCodes.CONFLICT
  },
  ValidationError: {
    message: 'Validation Error',
    httpStatus: StatusCodes.BAD_REQUEST
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
