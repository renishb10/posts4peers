const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'posts4peers.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

module.exports = allowCrossDomain;

// Not Used, we can add more middlewares here this folder and chain up to the app.
