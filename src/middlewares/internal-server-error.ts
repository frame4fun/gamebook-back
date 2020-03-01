import { Request, Response, NextFunction } from 'express';

export default function internalServorError(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  return res.status(500).send(err.message);
}
