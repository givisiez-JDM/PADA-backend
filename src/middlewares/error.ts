import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorCatalog, ErrorTypes } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req,
  res,
  _next,
) => {
  // verifica se é um erro do catálogo
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }

  // verifica se o erro tem uma mensagem
  else if (err.message) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }

  console.error(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'internal error' });
};

export default errorHandler;
