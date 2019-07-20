const router = require('express').Router();

// Custom dependencies
const { getPosts, getPostsByAuthorId, createPost } = require('./repository');
const { isPostPayloadValid } = require('./validator');

///////////////////////////////////////////////////////////////
/// GET all posts (TODO: pagination & admin authorization)
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    //const posts = await getPostsByAuthorId(123);
    const posts = await getPosts();
    return res.json(posts);
  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message });
  }
});

///////////////////////////////////////////////////////////////
/// Create a post
///////////////////////////////////////////////////////////////
router.post('/', async (req, res, next) => {
  try {
    if (isPostPayloadValid(req.body)) {
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

module.exports = router;
