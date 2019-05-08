import createError from 'http-errors';

export default function requireAuthentification(req, res, next) {
  if (!req.user) {
    return next(new createError.Unauthorized());
  }
  next();
}
