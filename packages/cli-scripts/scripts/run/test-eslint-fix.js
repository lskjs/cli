#!/usr/bin/env node
const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async ({ isRoot } = {}) => {
  if (isRoot) {
    await shell(`${findBin('eslint')} --fix package.json`);
    await shell('pnpm -r exec lsk run test:eslint-fix');
  } else {
    await shell(`${findBin('eslint')} --fix package.json src`);
  }
};

module.exports = run(main);
