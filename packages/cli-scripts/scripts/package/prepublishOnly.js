#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`rsync -aEp package.json package-lock.json yarn.lock release/`);
};

run(main);
