// eslint-disable-next-line no-unused-vars
export default function internalServorError(err, req, res, next) {
  return res.status(500).send(err.message);
}
