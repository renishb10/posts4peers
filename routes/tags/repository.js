// Custom dependencies
const Tag = require('../../models/tag.model');

const createTag = async name => {
  return await Tag.create({ name })
    .then(t => {
      return t;
    })
    .catch(e => {
      throw e;
    });
};

const getTags = async () => {
  return await Tag.find({})
    .then(t => {
      console.log(t);
      return t;
    })
    .catch(e => {
      throw e;
    });
};

const searchTags = async key => {
  return await Tag.find({
    name: {
      $regex: new RegExp(key, 'i'),
    }, // case insensitive finder
  })
    .then(t => {
      return t;
    })
    .catch(e => {
      throw e;
    });
};

module.exports = {
  createTag,
  getTags,
  searchTags,
};
