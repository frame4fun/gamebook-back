import createError from 'http-errors';

// eslint-disable-next-line no-unused-vars
export default function internalServorError(err, req, res, next) {
  res.status(err.status || createError.InternalServerError()).send(err.message);
}
