export default function requireAuthentification(req, res, next) {
  if (!req.user) {
    res.sendStatus(401);
  }
  next();
}
