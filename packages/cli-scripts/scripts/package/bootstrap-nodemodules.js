#!/usr/bin/env node
const { shell } = require('@lskjs/cli-utils')
const { run } = require('@lskjs/cli-utils')

const main = async () => {
  await shell('rm -rf build/node_modules');
  await shell('ln -s node_modules build/node_modules');
};

run(main);
