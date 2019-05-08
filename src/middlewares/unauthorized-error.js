import createError from 'http-errors';

export default function unauthorized(err, req, res, next) {
  if (err instanceof createError.Unauthorized) {
    return res.status(err.status).send(err.message);
  }
  next(err);
}
