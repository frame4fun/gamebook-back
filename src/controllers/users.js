import passport from 'passport';
import { Router } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function(email, password, done) {
      User.findOne({ email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (user.password !== password) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

const router = new Router();

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});
router.post('/signup', addUser);
router.get('/logout', logout);
router.get('/:id', getUserById);

export default router;

function addUser(req, res, next) {
  return User.create(
    { email: req.body.email, password: req.body.password },
    function(err, user) {
      if (err) {
        next(err);
      }
      res.send(user);
    }
  );
}

function getUserById(req, res, next) {
  return User.findById(req.params.id, function(err, user) {
    if (err) {
      next(err);
    }
    res.send(user);
  });
}

function logout(req, res) {
  req.logout();
  res.sendStatus(200);
}
