#!/usr/bin/env node
const { isCI } = require('@lskjs/env');
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ isRoot } = {}) => {
  if (isRoot) {
    await shell('pnpm -r exec test:size-limit');
  } else {
    const ciArgs = isCI ? '--hide-passed' : '';
    await shell(`lsk run test:size-limit ${ciArgs}`);
  }
};

module.exports = run(main);
