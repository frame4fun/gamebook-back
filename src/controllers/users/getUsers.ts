import createError from 'http-errors';
import { RequestHandler, User } from '../../types';
import { findAll } from '../../models/User';

const getUsers: RequestHandler<{}, User[], {}> = async (req, res, next) => {
  try {
    const users = await findAll();
    if (!users) {
      return next(new createError.NotFound());
    }
    return res.send(users);
  } catch (err) {
    return next(err);
  }
};

export default getUsers;
