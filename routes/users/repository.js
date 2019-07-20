const User = require('../../models/user.model');

const getUserByEmail = async email => {
  return await User.findOne({ email: email })
    .then(u => {
      return u;
    })
    .catch(e => {
      throw e;
    });
};

const createUser = async user => {
  return await User.create(user)
    .then(u => {
      return u;
    })
    .catch(e => {
      throw e;
    });
};

module.exports = {
  getUserByEmail,
  createUser,
};
