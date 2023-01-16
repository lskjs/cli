#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell('lsk run test:jest');
  await shell('lsk run test:eslint');
  await shell('lsk run test:size-limit');
};

module.exports = run(main);
