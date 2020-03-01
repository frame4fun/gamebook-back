import { RequestHandler } from '../../types';

const logout: RequestHandler<never, never, never> = (req, res) => {
  req.logout();
  return res.sendStatus(200);
};

export default logout;
