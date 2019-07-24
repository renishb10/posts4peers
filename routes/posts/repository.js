const Post = require('../../models/post.model');

const createPost = async post => {
  return await Post.create(post)
    .then(p => {
      return p;
    })
    .catch(e => {
      throw e;
    });
};

const getPosts = async () => {
  return await Post.find({})
    .then(p => {
      return p;
    })
    .catch(e => {
      throw e;
    });
};

const getPostsByAuthorId = async authorId => {
  return await Post.find({
    authorId: authorId,
  })
    .then(p => {
      return p;
    })
    .catch(e => {
      throw e;
    });
};

const getPostsByMultipleAuthorId = async authorIds => {
  return await Post.find({
    author: {
      $in: authorIds,
    },
  })
    .then(p => {
      return p;
    })
    .catch(e => {
      throw e;
    });
};

const getPostsByTags = async tags => {
  return await Post.find({
    tags: {
      $in: tags,
    },
  })
    .then(p => {
      return p;
    })
    .catch(e => {
      throw e;
    });
};

const getPostsByInterests = async (tags, followings, skip = 0, limit = 10) => {
  skip = parseInt(skip);
  limit = parseInt(limit);
  return await Post.find({
    $or: [
      {
        tags: {
          $in: tags,
        },
      },
      {
        author: {
          $in: followings,
        },
      },
    ],
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .then(p => {
      return p;
    })
    .catch(e => {
      throw e;
    });
};

module.exports = {
  createPost,
  getPosts,
  getPostsByAuthorId,
  getPostsByMultipleAuthorId,
  getPostsByTags,
  getPostsByInterests,
};
