const jwt = require('jsonwebtoken');
const { auth } = require('../../configs');

// Generates JWT
const getJwtUserToken = user => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isSuperAuthor: user.isSuperAuthor,
    },
    auth.jwtKey,
    {
      expiresIn: auth.jwtExpiresIn,
    },
  );

  return token;
};

module.exports = {
  getJwtUserToken,
};
