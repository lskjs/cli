#!/usr/bin/env node
const { isCI } = require('@lskjs/env');
const { run, shell, findBin, shellParallel } = require('@lskjs/cli-utils');

const main = async ({ isRoot, ctx } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run test:size-limit', { ctx });
  } else {
    const ciArgs = isCI ? '--hide-passed' : '';
    await shell(`${findBin('size-limit')} ${ciArgs}`, { ctx });
  }
};

module.exports = run(main);
