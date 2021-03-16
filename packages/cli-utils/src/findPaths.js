const { getPaths } = require('./getPaths');

const fs = require('fs');

const findPaths = (params = {}) => {
  // eslint-disable-next-line no-param-reassign
  if (typeof params === 'string') params = { name: params };
  const paths = getPaths(params);
  return paths.filter((p) => fs.existsSync(p));
};

module.exports = {
  findPaths,
};
