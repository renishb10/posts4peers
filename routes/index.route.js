const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to Post4Peers Core API Service');
});

module.exports = router;
