#!/usr/bin/env node
const { run, shell, findBin, shellParallel } = require('@lskjs/cli-utils');

const main = async ({ isRoot, cwd, ctx } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run test:jest', { ctx });
  } else {
    await shell(`${findBin('jest')} --coverage --config ../../scripts/jest.config.json --rootDir ${cwd}`, {ctx});
  }
};

module.exports = run(main);
