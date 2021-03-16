#!/usr/bin/env node
const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async () => {
  console.log('husky-pre-push');
  await shell(`ls`);
};

run(main);
