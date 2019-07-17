const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Post4Peers Core API Service');
});

module.exports = router;
