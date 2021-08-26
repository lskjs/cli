#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell('lsk run lint:js');
  await shell('lsk run lint:ts');
};

run(main);
