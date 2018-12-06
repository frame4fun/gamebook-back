import { createServer } from 'http';
import app from './app';
import dbConnect from './models/connection';

dbConnect(() => {
  console.log('✔ Connection established to mongoDB database'.green);

  app.set('port', normalizePort(process.env.PORT || 8080));

  const server = createServer(app);
  server.listen(app.get('port'), () => {
    console.log(
      '✔ Server listening on port'.green,
      String(app.get('port')).cyan
    );
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
