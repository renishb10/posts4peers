const router = require('express').Router();

// Custom dependencies
const auth = require('../../middlewares/auth');
const { getUserFeeds } = require('./controller');
const { getPosts, getPostsByAuthorId, createPost } = require('./repository');
const { isPostPayloadValid } = require('./validator');

///////////////////////////////////////////////////////////////
/// GET all posts (TODO: pagination & admin authorization)
///////////////////////////////////////////////////////////////
router.get('/', auth.authenticate(), async (req, res, next) => {
  try {
    const posts = await getPostsByAuthorId(req.user.id);
    return res.json(posts);
  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message });
  }
});

///////////////////////////////////////////////////////////////
/// Create a post
///////////////////////////////////////////////////////////////
router.post('/', auth.authenticate(), async (req, res, next) => {
  try {
    if (isPostPayloadValid(req.body)) {
      req.body.author = req.user.id;
      const newPost = await createPost(req.body);
      return res.json(newPost);
    } else
      res.status(400).send({
        status: 'error',
        message: 'Invalid post request, check your input',
      });
  } catch (e) {
    res.status(400).send({ status: 'error', message: e.message });
  }
});

///////////////////////////////////////////////////////////////
/// GET user feeds (TODO: pagination & admin authorization)
///////////////////////////////////////////////////////////////
router.get('/feeds', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const skip = req.query.skip ? req.query.skip : 0;
    const limit = req.query.limit ? req.query.limit : 0;
    const feeds = await getUserFeeds(userId, skip, limit);
    return res.json(feeds);
  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message });
  }
});

module.exports = router;
