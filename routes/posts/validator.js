const _ = require('lodash');

const isPostPayloadValid = (post) => {
  if (_.isEmpty(post) || _.isEmpty(post.title) || _.isEmpty(post.body)) return false;
  return true;
};

module.exports = {
  isPostPayloadValid,
};
