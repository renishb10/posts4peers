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

// Note: this excludes password field
const getUserById = async userId => {
  return await User.findOne({ _id: userId }, { password: 0 })
    .then(u => {
      return u;
    })
    .catch(e => {
      throw e;
    });
};

// Note: by default fetch normal users
const getUsersByType = async (isSuperAuthor = false) => {
  return await User.find({ isSuperAuthor: isSuperAuthor }, { password: 0 })
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
  getUserById,
  getUserByEmail,
  createUser,
  getUsersByType,
};
