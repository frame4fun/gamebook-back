import passport from 'passport';
import { RequestHandler, User } from '../../types';

const login: RequestHandler<never, User, never> = (req, res) => {
  return res.send(req.user as User);
};

export default [passport.authenticate('local'), login];
