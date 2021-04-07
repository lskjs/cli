#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`rsycn -aEp package.json package-lock.json yarn.lock release/`);
  await shell(`npm publish release/`);
};

run(main);
