const router = require('express').Router();

// Custom dependencies
const {
  isUsrSignUpPayloadValid,
  isUsrSignInPayloadValid,
} = require('./validator');
const { getUserByEmail, createUser, getUserById } = require('./repository');
const {
  getJwtUserToken,
  handleFollowing,
  handleUnfollowing,
  getTag,
  followTag,
  unFollowTag,
} = require('./controller');
const auth = require('../../middlewares/auth');

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
          return res.json({ token: `Bearer ${getJwtUserToken(u)}` });
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

///////////////////////////////////////////////////////////////
/// Follow another user
///////////////////////////////////////////////////////////////
router.patch('/follow/:userId', auth.authenticate(), async (req, res, next) => {
  try {
    const anotherUserId = req.params.userId;
    if (req.user.id === anotherUserId)
      return res
        .status(400)
        .send({ status: 'error', message: 'You cannot follow yourself' });

    getUserById(anotherUserId)
      .then(anotherUser => {
        if (!anotherUser)
          return res.status(400).send({
            status: 'error',
            message: 'Follow userId is invalid/not exists',
          });

        getUserById(req.user.id).then(async user => {
          if (user.following.includes(anotherUserId)) {
            res.status(400).send({
              status: 'error',
              message: 'User is already in the following list',
            });
          }

          // Ingest anotherUserId to following slot of user & vice versa
          const result = await handleFollowing(user, anotherUser);
          res.json(result);
        });
      })
      .catch(e => {
        res.status(400).send({ status: 'error', message: e.message });
      });
  } catch (e) {
    res.status(400).send({ status: 'error', message: e.message });
  }
});

///////////////////////////////////////////////////////////////
/// UnFollow a user
///////////////////////////////////////////////////////////////
router.patch(
  '/unfollow/:userId',
  auth.authenticate(),
  async (req, res, next) => {
    try {
      const anotherUserId = req.params.userId;
      if (req.user.id === anotherUserId)
        return res
          .status(400)
          .send({ status: 'error', message: 'You cannot unfollow yourself' });

      getUserById(anotherUserId)
        .then(anotherUser => {
          if (!anotherUser)
            return res.status(400).send({
              status: 'error',
              message: 'Unfollow userId is invalid/not exists',
            });

          getUserById(req.user.id).then(async user => {
            // Remove anotherUserId from following slot of user & vice versa
            const result = await handleUnfollowing(user, anotherUser);
            res.json(result);
          });
        })
        .catch(e => {
          res.status(400).send({ status: 'error', message: e.message });
        });
    } catch (e) {
      res.status(400).send({ status: 'error', message: e.message });
    }
  },
);

///////////////////////////////////////////////////////////////
/// Follow another user //TODO if_needed: Go for multiple tags follow
///////////////////////////////////////////////////////////////
router.patch(
  '/tag/:tagId/follow',
  auth.authenticate(),
  async (req, res, next) => {
    try {
      const tagId = req.params.tagId;

      getTag(tagId)
        .then(tag => {
          if (!tag)
            return res.status(400).send({
              status: 'error',
              message:
                'Cannot follow a tag that doesnt exists,  create new tag, using /tag api',
            });

          getUserById(req.user.id).then(async user => {
            if (user.tags.includes(tagId)) {
              res.status(400).send({
                status: 'error',
                message: 'User is already following the given tag',
              });
            }

            // Ingest the tag to following slot of user tag list
            const result = await followTag(user, tagId);
            console.log('result', result);
            res.json(result);
          });
        })
        .catch(e => {
          res.status(400).send({ status: 'error', message: e.message });
        });
    } catch (e) {
      res.status(400).send({ status: 'error', message: e.message });
    }
  },
);

///////////////////////////////////////////////////////////////
/// UnFollow tag //TODO if_needed: Go for multiple tags unfollow
///////////////////////////////////////////////////////////////
router.patch(
  '/tag/:tagId/unfollow',
  auth.authenticate(),
  async (req, res, next) => {
    try {
      const tagId = req.params.tagId;

      getTag(tagId)
        .then(tag => {
          if (!tag)
            return res.status(400).send({
              status: 'error',
              message: 'Cannot unfollow a tag that doesnt exists',
            });

          getUserById(req.user.id).then(async user => {
            // Remove tag from user's tag slot
            const result = await unFollowTag(user, tagId);
            res.json(result);
          });
        })
        .catch(e => {
          res.status(400).send({ status: 'error', message: e.message });
        });
    } catch (e) {
      res.status(400).send({ status: 'error', message: e.message });
    }
  },
);

module.exports = router;
