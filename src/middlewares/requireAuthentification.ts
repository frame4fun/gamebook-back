import createError from 'http-errors';
import { RequestHandler } from '../types';

const requireAuthentification: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next(new createError.Unauthorized());
  }
  return next();
};

export default requireAuthentification;
