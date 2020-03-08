import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import createLogger from 'morgan';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import cors from 'cors';
import createError from 'http-errors';
import 'colors';

import storiesController from './controllers/stories';

import { User } from './types';
import { findByEmail, findById } from './models/User';
import { usersRouter } from './routers';
import {
  requireAuthentificationMiddleware,
  httpErrorsMiddleware,
  errorsMiddleware,
} from './middlewares';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await findByEmail(email);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser<User, string>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser<User, string>(async (id, done) => {
  try {
    const user = await findById(id);
    if (user === null) {
      return done(new createError.NotFound('The user does not exist'));
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const app = express();

app.use(helmet());

app.use(bodyParser.json());

app.use(createLogger('combined'));

app.use(passport.initialize());

app.use(
  cookieSession({
    name: 'gamebook:session',
    secret: 'toto',
    httpOnly: true,
    secure: true,
  })
);

app.use(passport.session());

app.use(cors({ credentials: true }));

app.use('/users', usersRouter);
app.use('/stories', requireAuthentificationMiddleware, storiesController);
app.use((req, res, next) => {
  res.status(404).send("This is not the page you're lokking for!");
});

app.use(httpErrorsMiddleware);
app.use(errorsMiddleware);

export default app;
