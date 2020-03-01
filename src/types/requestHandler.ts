import { Response, NextFunction } from 'express';
import {
  Request as ExpressRequest,
  // eslint-disable-next-line import/no-unresolved, node/no-missing-import
} from 'express-serve-static-core';
import { HttpError } from 'http-errors';

type Request<Params, Res, Body> = ExpressRequest<Params & {}, Res, Body>;

export type RequestHandler<Params = unknown, Res = unknown, Body = unknown> = (
  req: Request<Params, Res, Body>,
  res: Response<Res>,
  next: NextFunction
) => Promise<Response<Res> | void> | Response<Res> | void;

export type ErrorRequestHandler<
  Params = unknown,
  Res = unknown,
  Body = unknown
> = (
  err: Error | HttpError,
  req: Request<Params, Res, Body>,
  res: Response<Res>,
  next: NextFunction
) => Response<Res> | void;
