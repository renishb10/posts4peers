const router = require('express').Router();

// Custom dependencies
const { getTags, createTag, searchTags } = require('./repository');

///////////////////////////////////////////////////////////////
/// GET all tags (TODO: pagination & admin authorization)
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    const tags = await getTags();
    return res.json(tags);
  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message });
  }
});

///////////////////////////////////////////////////////////////
/// Create a tag
///////////////////////////////////////////////////////////////
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (name) {
      const newTag = await createTag(name.toLowerCase());
      return res.json(newTag);
    } else
      res
        .status(400)
        .send({ status: 'error', message: 'name is mandatory property' });
  } catch (e) {
    res.status(400).send({ status: 'error', message: e.message });
  }
});

///////////////////////////////////////////////////////////////
/// Search for tags (Query string - /search?key=something)
///////////////////////////////////////////////////////////////
router.get('/search', async (req, res, next) => {
  try {
    const key = req.query.key;
    if (key && key.length > 2) {
      const tags = await searchTags(key.toLowerCase());
      return res.json(tags);
    } else
      res.status(400).send({
        status: 'error',
        message: 'search key is empty or less than 3 characters',
      });
  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message });
  }
});

module.exports = router;
