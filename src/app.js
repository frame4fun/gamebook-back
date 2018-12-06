import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import createLogger from 'morgan';
import methodOverride from 'method-override';
import passport from 'passport';
import 'colors';

import corsMiddleware from './middlewares/cors';
import usersController from './controllers/users';

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(methodOverride(req => req.body._method));

app.use(createLogger('combined'));

app.use(passport.initialize());

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

app.use('/users', usersController);

export default app;
