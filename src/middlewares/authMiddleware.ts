import { Request, Response, NextFunction } from 'express';
import { ErrorTypes } from '../errors/catalog';
import JwtService from '../services/jwtService';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new Error(ErrorTypes.InvalidToken);
  }

  // o token de autorização é enviado no formato 'Bearer <token>'
  // o split separa a string em dois e o primeiro elemento `Bearer` não será utilizado
  // A desestruturação permite que o segundo elemento `token` seja atribuído diretamente à variável token
  const [token] = authorization.split(' ');

  try {
    JwtService.validateToken(token);
    return next();
  } catch (error) {
    throw new Error(ErrorTypes.InvalidToken);
  }
}