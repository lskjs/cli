const { getLskConfig } = require('./getLskConfig');
const { lerna } = require('./lerna');

const lernaParallel = (...args) => {
  const concurrency = getLskConfig().concurrency || 4;
  return lerna(`--concurrency ${concurrency}`, ...args);
};

module.exports = {
  lernaParallel,
};
