const _ = require('lodash');

const isUsrSignUpPayloadValid = (user) => {
  if (
    _.isEmpty(user)
    || _.isEmpty(user.firstName)
    || _.isEmpty(user.lastName)
    || _.isEmpty(user.email)
    || _.isEmpty(user.password)
  ) return false;
  return true;
};

const isUsrSignInPayloadValid = (user) => {
  if (_.isEmpty(user) || _.isEmpty(user.email) || _.isEmpty(user.password)) return false;
  return true;
};

module.exports = {
  isUsrSignUpPayloadValid,
  isUsrSignInPayloadValid,
};
