#!/usr/bin/env node
const { run, lerna } = require('@lskjs/cli-utils');

const main = async () => {
  await lerna(`exec --parallel -- lsk run build`);
};

run(main);
