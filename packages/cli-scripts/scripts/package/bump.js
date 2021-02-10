#!/usr/bin/env node

const { shell } = require('@lskjs/cli-utils')
const { run } = require('@lskjs/cli-utils')

const main = async () => {
  await shell('date > bump.txt');
};

run(main);
