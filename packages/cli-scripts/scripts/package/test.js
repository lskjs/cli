#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`jest --passWithNoTests`);
};

run(main);
