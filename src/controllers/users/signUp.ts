import { RequestHandler } from '../../types';
import { create } from '../../models/User';

interface Body {
  alias: string;
  email: string;
  password: string;
}

const signUp: RequestHandler<never, never, Body> = async (req, res, next) => {
  try {
    await create(req.body.alias, req.body.email, req.body.password);
    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

export default signUp;
