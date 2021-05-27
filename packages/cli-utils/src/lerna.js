const { shell } = require('./shell');
const { findBin } = require('./findBin');

const lerna = (...args) => {
  const scope = process.env.SCOPE || process.env.PACKAGES || null;
  shell([findBin('lerna'), '--loglevel warn', scope && `--scope ${scope}`, ...args].filter(Boolean).join(' '));
};

module.exports = {
  lerna,
};
