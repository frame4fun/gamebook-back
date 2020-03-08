import createError from 'http-errors';
import { RequestHandler, User } from '../../types';
import { findById } from '../../models/User';

type Params = {
  id: string;
};

const getUserById: RequestHandler<Params, User, {}> = async (
  req,
  res,
  next
) => {
  try {
    const user = await findById(req.params.id);
    if (user === null) {
      return next(new createError.NotFound('The user does not exist'));
    }
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

export default getUserById;
