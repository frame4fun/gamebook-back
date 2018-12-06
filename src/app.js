import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import createLogger from 'morgan';
import methodOverride from 'method-override';
import 'colors';

import corsMiddleware from './middlewares/cors';

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(methodOverride(req => req.body._method));

app.use(createLogger('combined'));

app.use(
  cookieSession({
    name: 'gamebook:session',
    secret: 'toto',
    cookie: {
      secure: true,
      httpOnly: true,
    },
  })
);

app.use(corsMiddleware);

export default app;
