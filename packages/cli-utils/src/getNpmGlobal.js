const path = require('path');
const { execSync } = require('child_process');

const getNpmGlobal = () => {
  let str = execSync('npm root -g');
  if (!str) return null;
  str = str.toString().trim();
  if (!str) return null;
  return path.resolve(`${str}/..`);
};

module.exports = {
  getNpmGlobal,
};
