#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ isRoot } = {}) => {
  if (isRoot) {
    await shell('pnpm -r run test');
  } else {
    await shell('lsk run test:jest');
    await shell('lsk run test:eslint');
    await shell('lsk run test:size-limit');
  }
};

module.exports = run(main);
