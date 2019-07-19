const router = require('express').Router();

///////////////////////////////////////////////////////////////
/// GET all posts (TODO: pagination & admin authorization)
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    res.json({ message: 'Users' });
  } catch (e) {
    res.status(404).send({ status: 'error', message: e.message });
  }
});

module.exports = router;
