#!/usr/bin/env node
const { run,} = require('../../packages/cli-utils/src');

const main = async (options) => {
  console.log('[test5]: broadcast package');
};

module.exports = run(main);
