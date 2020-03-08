import { HttpError } from 'http-errors';
import { ErrorRequestHandler } from '../types';

const httpErrors: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).send(err.message);
  }
  return next(err);
};

export default httpErrors;
