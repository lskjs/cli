#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  console.log('husky-pre-commit');
  await shell(`ls`);
};

run(main);
