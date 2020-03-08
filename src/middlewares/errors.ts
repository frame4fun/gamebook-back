import { ErrorRequestHandler } from '../types';

const internalServerError: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  return res.status(500).send(err.message);
};

export default internalServerError;
