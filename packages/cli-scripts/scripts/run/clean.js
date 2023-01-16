#!/usr/bin/env node
const { run, shell, shellParallel } = require('@lskjs/cli-utils');

const main = async ({ isRoot, ctx } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run clean', { ctx });
    return;
  }
  await shell('rm -rf ./lib/* ./coverage ./package', { ctx });
};

module.exports = run(main);
