const { findPaths } = require("./findPaths");

const findPath = (params = {}) => {
  // eslint-disable-next-line no-param-reassign
  if (typeof params === "string") params = { name: params };
  const paths = findPaths(params);
  return paths[0];
};

module.exports = {
  findPath,
};
