import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

export default function unauthorized(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof createError.Unauthorized) {
    return res.status(err.status).send(err.message);
  }
  return next(err);
}
