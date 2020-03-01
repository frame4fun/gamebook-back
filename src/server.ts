import { createServer } from 'http';
import app from './app';
import neo4jDriver from './neo4jDriver';

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): string | number | boolean {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
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

const server = createServer(app);

neo4jDriver.verifyConnectivity().then(
  () => {
    // eslint-disable-next-line no-console
    console.log('✔ Connection established to neo4j database'.green);

    app.set('port', normalizePort(process.env.PORT ?? '8080'));
    server.listen(app.get('port'), () => {
      // eslint-disable-next-line no-console
      console.log(
        '✔ Server listening on port'.green,
        String(app.get('port')).cyan
      );
    });
  },
  err => {
    // eslint-disable-next-line no-console
    console.error(err);
    neo4jDriver.close();
    // eslint-disable-next-line no-console
    console.log('Neo4j connection disconnected');
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
);

process.on('SIGINT', () => {
  // eslint-disable-next-line no-console
  console.info('SIGINT signal received.');

  // Stops the server from accepting new connections and finishes existing connections.
  server.close(async err => {
    // close your database
    let neo4jError;
    try {
      await neo4jDriver.close();
      // eslint-disable-next-line no-console
      console.log('Neo4j connection disconnected');
    } catch (neo4jErr) {
      neo4jError = neo4jErr;
    }

    // if error, log and exit with error (1 code)
    if (err || neo4jError) {
      // eslint-disable-next-line no-console
      console.error(err);
      // eslint-disable-next-line no-console
      console.error(neo4jError);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }
    // close your database connection and exit with success (0 code)
    // eslint-disable-next-line no-console
    console.log('Server disconnected');
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  });
});
