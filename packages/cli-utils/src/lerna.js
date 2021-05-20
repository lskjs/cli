const { shell } = require('./shell');
const { findBin } = require('./findBin');

const lerna = (...args) => shell([findBin('lerna'), '--loglevel warn', ...args].join(''));

module.exports = {
  lerna,
};
