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

module.exports = {
  createPost,
  getPostsByAuthorId,
};
