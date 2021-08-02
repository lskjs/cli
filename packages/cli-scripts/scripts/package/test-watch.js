#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  const argv = process.argv.slice(2);
  await shell(`jest --watch ${argv.join(' ')}`);
};

run(main);
