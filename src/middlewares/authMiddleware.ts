import { Request, Response, NextFunction } from 'express';
import { ErrorTypes } from '../errors/catalog';
import JwtService from '../utils/jwt';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new Error(ErrorTypes.InvalidToken);
  }

  const [token] = authorization.split(' ');

  try {
    JwtService.validateToken(token);
    return next();
  } catch (error) {
    throw new Error(ErrorTypes.InvalidToken);
  }
}