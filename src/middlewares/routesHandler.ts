import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export default function routesHandler(req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.NOT_FOUND).send("This route does not exist");
}