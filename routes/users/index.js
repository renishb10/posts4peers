const router = require('express').Router();

// Custom dependencies
const {
  isUsrSignUpPayloadValid,
  isUsrSignInPayloadValid,
} = require('./validator');
const { getUserByEmail, createUser } = require('./repository');
const { getJwtUserToken } = require('./controller');

///////////////////////////////////////////////////////////////
/// Signup a user
///////////////////////////////////////////////////////////////
router.post('/signup', async (req, res, next) => {
  try {
    if (isUsrSignUpPayloadValid(req.body)) {
      const { email } = req.body;

      // Check user already exists with the same email id
      const oldUser = await getUserByEmail(email);
      if (oldUser)
        return res
          .status(400)
          .send({ status: 'error', message: 'email id already exists' });

      const newUser = await createUser(req.body);
      return res.json(newUser);
    } else
      res.status(400).send({
        status: 'error',
        message: 'Invalid request, check your input',
      });
  } catch (e) {
    res.status(400).send({ status: 'error', message: e.message });
  }
});

///////////////////////////////////////////////////////////////
/// Signin a user & generate token
///////////////////////////////////////////////////////////////
router.post('/signin', async (req, res, next) => {
  try {
    if (isUsrSignInPayloadValid(req.body)) {
      const { email } = req.body;

      // Check user exist
      getUserByEmail(email)
        .then(u => {
          // Compare password
          if (!u.comparePasswords(u.password, req.body.password))
            return res
              .status(401)
              .send({ status: 'error', message: 'Invalid email/password' });

          // Generate token & send
          return res.json({ token: getJwtUserToken(u) });
        })
        .catch(e => {
          return res
            .status(401)
            .send({ status: 'error', message: 'Authentication Error' });
        });
    } else
      res.status(400).send({
        status: 'error',
        message: 'Invalid request, check your input',
      });
  } catch (e) {
    res.status(400).send({ status: 'error', message: e.message });
  }
});

module.exports = router;
