// Dependencies
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

// Custom dependencies
const User = require('../models/user.model');
const { auth } = require('../configs');

const jwtOptions = {
  secretOrKey: auth.jwtKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new Strategy(jwtOptions, (payload, cb) => {
  User.findById(payload.id)
    .then((user) => {
      if (user) {
        return cb(null, {
          id: user.id,
          email: user.email,
          isSuperAuthor: user.isSuperAuthor,
        });
      }
      return cb(null, false);
    })
    .catch(err => cb(err, null));
});

passport.use(jwtStrategy);

// Wrappers
const initialize = () => passport.initialize();

const authenticate = () => passport.authenticate('jwt', { session: false });

module.exports = {
  initialize,
  authenticate,
};
