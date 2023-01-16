#!/usr/bin/env node
const { run, shell, joinArgs, findBin } = require('@lskjs/cli-utils');

const main = async ({ isRoot, args, cwd } = {}) => {
  if (isRoot) {
    await shell('pnpm -r run test:watch');
  } else {
    const bareStart = args.indexOf('--');
    const bareArgs = bareStart >= 0 ? args.slice(bareStart + 1) : [];
    const bare = joinArgs(bareArgs);
    const cmd = `${findBin(
      'jest',
    )} --watch --coverage --config ../../scripts/jest.config.json --rootDir ${cwd} ${bare}`.trim();
    await shell(cmd);
  }
};

module.exports = run(main);
