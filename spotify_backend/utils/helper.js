const jwt = require("jwt");

exports = {};

exports.getToken = async () => {
  const token = jwt.sign({ identifier: user._id });
  return token;
};
module.exports = exports;