#!/usr/bin/env node
const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async ({ argv = [] } = {}) => {
  const args = argv.join(' ');
  console.log('husky-commit-msg', args);
  // npx --no commitlint --edit $1
  await shell(`${findBin('commitlint')} --edit ${args}`);
};

run(main);
