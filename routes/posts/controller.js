const _ = require('lodash');

const { getUserById, getUsersByType } = require('../users/repository');
const {
  getPostsByTags,
  getPostsByMultipleAuthorId,
  getPostsByInterests,
} = require('./repository');

// TODO: Refactor later
// INFO: This will not fetch user created posts
// Pagination works for User Interest posts only, meaning admin posts are like addon. (Assumption)
const getUserFeeds = async (userId, skip, limit) => {
  let feeds = [];
  const user = await getUserById(userId);

  if (user) {
    const userInterestPosts = await getPostsByInterests(
      user.tags,
      user.following,
      skip,
      limit,
    );
    const superAuthorPosts = await getSuperAuthorPosts();
    while (userInterestPosts.length > 0 || superAuthorPosts.length > 0) {
      if (userInterestPosts.length >= 2) {
        feeds.push(...userInterestPosts.splice(0, 2));
        if (superAuthorPosts.length >= 2)
          feeds.push(...superAuthorPosts.splice(0, 2));
        else feeds.push(...superAuthorPosts.splice(0, 1));
      } else {
        feeds.push(...userInterestPosts.splice(0, 1));
        if (superAuthorPosts.length >= 2)
          feeds.push(...superAuthorPosts.splice(0, 2));
        else feeds.push(...superAuthorPosts.splice(0, 1));
      }
    }
    return feeds;
  } else return feeds;
};

// This can be moved to utilities/helper section
const removeDuplicates = collection => {
  let s = new Set();
  collection.forEach(c => {
    s.add(c);
  });
  return Array.from(s);
};

const getSuperAuthorPosts = async () => {
  const superAuthorUsers = await getUsersByType(true);
  const ids = superAuthorUsers.map(s => s._id);
  const results = await getPostsByMultipleAuthorId(ids);
  return results;
};

module.exports = {
  getUserFeeds,
  getSuperAuthorPosts,
};
