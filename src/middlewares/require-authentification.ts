import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

export default function requireAuthentification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return next(new createError.Unauthorized());
  }
  return next();
}
