#!/usr/bin/env node
const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async ({ isRoot } = {}) => {
  if (isRoot) {
    await shell('pnpm -r exec test:eslint');
  } else {
    await shell(`${findBin('eslint')} src`);
  }
};

module.exports = run(main);
