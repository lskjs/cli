#!/usr/bin/env node
const { run, lerna } = require('@lskjs/cli-utils');

const main = async () => {
  await lerna(`exec --parallel --no-bail -- lsk run release:old`);
};

run(main);
