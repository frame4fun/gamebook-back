import createError from 'http-errors';
import { RequestHandler } from '../../types';
import { create, findByEmail } from '../../models/User';

interface Body {
  alias: string;
  email: string;
  password: string;
}

const signUp: RequestHandler<never, never, Body> = async (req, res, next) => {
  try {
    const user = await findByEmail(req.body.email);
    if (user === null) {
      return next(
        new createError.BadRequest(
          `The email ${req.body.email} is already used`
        )
      );
    }
    await create(req.body.alias, req.body.email, req.body.password);
    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

export default signUp;
