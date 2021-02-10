/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable array-callback-return */
const { findPath } = require("./findPath");

const getLskConfig = (options = {}) => {
  const path = findPath({
    name: ".lskjs",
    exts: [".js", ".json"],
    nodemodules: false,
    ...options,
  });
  if (!path) return {};
  try {
    return require(path);
  } catch (error) {
    console.error(`parse .lskjs.js err ${path}`, error);
    return {};
  }
};

module.exports = {
  getLskConfig,
};
