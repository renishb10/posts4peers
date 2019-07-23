const jwt = require('jsonwebtoken');
const { auth } = require('../../configs');

// Custom dependencies
const { getTagById } = require('../tags/repository');

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

const handleFollowing = async (user, anotherUser) => {
  // user -> requesting to follow some user
  // anotherUser -> that some user
  user.following.push(anotherUser._id);
  return await user
    .save()
    .then(async u => {
      if (anotherUser.followers.includes(user._id)) return anotherUser;

      // Else push it
      anotherUser.followers.push(user._id);
      await anotherUser
        .save()
        .then(u => {
          return u;
        })
        .catch(e => {
          throw e;
        });
    })
    .catch(e => {
      throw e;
    });
};

const handleUnfollowing = async (user, anotherUser) => {
  // user -> requesting to follow some user
  // anotherUser -> that some user
  user.following = user.following.filter(
    a => a.toString() !== anotherUser._id.toString(),
  );
  return await user
    .save()
    .then(async u => {
      anotherUser.followers = anotherUser.followers.filter(
        a => a.toString() !== user._id.toString(),
      );
      await anotherUser
        .save()
        .then(u => {
          return u;
        })
        .catch(e => {
          throw e;
        });
    })
    .catch(e => {
      throw e;
    });
};

// Just a wrapper
const getTag = async tagId => {
  return getTagById(tagId);
};

const followTag = async (user, tagId) => {
  user.tags.push(tagId);
  return await user
    .save()
    .then(u => {
      return u;
    })
    .catch(e => {
      throw e;
    });
};

const unFollowTag = async (user, tagId) => {
  user.tags = user.tags.filter(a => a.toString() !== tagId);
  return await user
    .save()
    .then(u => {
      return u;
    })
    .catch(e => {
      throw e;
    });
};

module.exports = {
  getJwtUserToken,
  handleFollowing,
  handleUnfollowing,
  getTag,
  followTag,
  unFollowTag,
};
