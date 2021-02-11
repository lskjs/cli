const { findPath } = require("./findPath");

const findBin = (command) => {
  if (command === "babel") {
    return findPath("node_modules/@babel/cli/bin/babel.js") || `npx ${command}`;
  }
  return `npx ${command}`;
};

module.exports = {
  findBin,
};
