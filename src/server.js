import mongoose from 'mongoose';
import { createServer } from 'http';
import app from './app';
import dbConnect from './models/connection';

const server = createServer(app);

dbConnect(() => {
  // eslint-disable-next-line no-console
  console.log('✔ Connection established to mongoDB database'.green);

  app.set('port', normalizePort(process.env.PORT || 8080));

  server.listen(app.get('port'), () => {
    // eslint-disable-next-line no-console
    console.log(
      '✔ Server listening on port'.green,
      String(app.get('port')).cyan
    );
    process.send('ready');
  });
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');

  // Stops the server from accepting new connections and finishes existing connections.
  server.close(function(err) {
    // if error, log and exit with error (1 code)
    if (err) {
      console.error(err);
      process.exit(1);
    }

    // close your database connection and exit with success (0 code)
    // for example with mongoose
    mongoose.connection.close(function() {
      console.log('Mongoose connection disconnected');
      process.exit(0);
    });
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
