#!/usr/bin/env node
const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async ({ isRoot, cwd } = {}) => {
  if (isRoot) {
    await shell('pnpm -r exec test:jest');
  } else {
    await shell(`${findBin('jest')} --coverage --config ../../scripts/jest.config.json --rootDir ${cwd}`);
  }
};

module.exports = run(main);
